/**
 * 
 * File : userController.ts
 * All the callback functions corresponding to some routes.
 * Functions related to users :
 * - validateToken 
 * - register
 * - login
 * - getAllUsers
 * - deleteUser
 * 
 * @author Balta Team
 */

 import { NextFunction, Request, Response } from 'express';
 import mongoose from 'mongoose';
 import bcryptjs from 'bcryptjs';
 import config from "../config/config";
 import joi from 'joi';
 import { exec } from 'child_process';
 import nodemailer from 'nodemailer';
 import logging from '../config/logging';
 import User from '../models/userSchema';
 import signJWT from "../functions/signJWT";


/**
  * To use to validate jwt.
  * 
  * @param req : Client request object
  * @param res : Server response object
  * @param next : Next function
  * @returns Server response object
  */
 const validateToken = (req: Request, res: Response, next: NextFunction) => {
     logging.log('User', 'Token validated, user authorized.');
 
     return res.status(200).json({
         message: 'Token(s) validated'
     });
 };
 
 /**
  * In order for a user to register.
  * Note that for each user register / created, we assign him a directory through the 'projectPath' property. 
  * 
  * @param req : Client request object
  * @param res : Server response object
  * @param next : Next function
  * @returns Server response object
  */
 const register = async (req: Request, res: Response, next: NextFunction) => {
    let {username, email, password} = req.body;
    console.log("Username : " + username + "\nemail : " + email + "\npassword : " + password);

    if(username === "" || typeof(username) === undefined){
        res.status(400).json({
            message : "Aucun username renseigné",
            success : false});
        return
    }else if(email === "" || typeof(email) === undefined) {
        res.status(400).json({
            message: "Aucun email renseigné",
            success: false
        });
        return
    }else if(password === "" || typeof(password) === undefined) {
        return res.status(400).json({
            message: "Aucun password renseigné",
            success: false
        });
    }

    //Verify if an email is correct
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
     if(!regexExp.test(email)){
         return res.status(400).json({
             message: "L'email n'est pas valide.",
             success: false
         });
     }

    // Verify password length
    if(password.length < 6) {
        return res.status(400).json({
            message: "Le mot de passe est trop court. Minimum 6 caractères.",
            success: false
        });
    }

    // Existing email ? :
    const loginExist = await User.findOne({ email: email});
    if(loginExist) {
        return res.status(400).json({
            message: "L'adresse email est déjà utilisée.",
            success: false
        });
    }
    
    // Hash the password before storing the user
     bcryptjs.hash( password, 10, (hashError: { message: String; }, hash: any) => {
         if (hashError) {
             return res.status(401).json({
                 message: hashError.message,
                 error: hashError
             });
         }

         const user = new User({
             username,
             email,
             password: hash,
             registrationDate : Date.now()
         });

         // Create an AMC folder for every new user
         createNewProject(email);
 
         // save the user and return the status
         return user.save()
             .then((user: any) => {
                 return res.status(201).json({
                     message : "Utilisateur créé avec succès !",
                     success : true
                 });
             })
             .catch((error: { message: any; }) => {
                 return res.status(500).json({
                     message: "Erreur lors de la création de l'utilisateur." + error.message,
                     error,
                     success : false
                 });
             });
     });
 };
 
 /**
  * Constraints for user information for login.
  */
const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

 /**
  * In order to login for a registered user.
  * 
  * @param req : Client request object
  * @param res : Server response object
  * @param next : Next function
  * @returns Server response object
  */
 const login = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // Existing email ? :
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "L'email renseigné n'existe pas.",
                success: false
            });
        }

        // Passwords match ? :
        const validPassword = await bcryptjs.compare(req.body.password, user.password);
        if(!validPassword) {
            return res.status(400).json({
                message: "Les identifiants ne correspondent pas.",
                success: false
            });
        }

        // Validation of user inputs
        const { error } = await loginSchema.validateAsync(req.body);
        if(error) {
            return res.status(400).json(error);
        } else {
            await signJWT(user, function (_error, token) {
                if (_error) {
                    return res.status(500).json({
                        message: "Erreur dans la création du token d'accès : " + _error.message,
                        error: _error,
                        success : false
                    });
                } else if (token) {
                    return res
                    .status(200)
                    .json({
                        message: 'Auth successful',
                        success : true,
                        "token": token
                    });
                }
            });
        }
    } catch(e) {
        return res.status(500).json({
            message : "Erreur lors de la tentative de connexion : \n" + e,
            success: false
        });
    }
 };

/** Creates a new AMC-Latex project. 
  *  It is a unique folder that has the userID as a name.
  *  Not a callback function.
  * 
  * @userEmail : 1 user <=> 1 folder. To keep every folder unique, they are named as the user's id in mongoDB
  * @return : the error message if there is one
  */
  function createNewProject(userEmail: String) {

    let projectPath = `$HOME/Projets-QCM/${userEmail}`;

    exec(`mkdir ${projectPath} && mkdir ${projectPath}/cr && mkdir ${projectPath}/cr/corrections && mkdir ${projectPath}/cr/corrections/jpg && mkdir ${projectPath}/cr/corrections/pdf && mkdir ${projectPath}/cr/diagnostic && mkdir ${projectPath}/cr/zooms && mkdir ${projectPath}/data && mkdir ${projectPath}/exports && mkdir ${projectPath}/scans && mkdir ${projectPath}/copies`
        , (error, stdout, stderr) => {
            if(error) {
                console.log("Erreur dans la création du projet : \n" + error.message);
                return error.message;
            }
            if(stderr) {
                console.log("Erreur dans la création du projet : \n" + stderr);
                return stderr;
            }
            console.log("Création d'un projet AMC : \n" + stdout);
     });
}


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.email,
        pass: config.email_password
    }
});

/**
 * Midleware that generates a random number and sends it to the given email.
 * The user then has to enter the number sent to change his password with 
 * the changePassword middleware.
 * 
 * @param req 
 * @param res 
 * @param next 
 */
const forgottenPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
        // Existing email ? :
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "L'email renseigné n'existe pas.",
                success: false
            });
        }

        // generate random number and store it + deletion after 10min
        const validationCode: string  = String(Math.floor(100000 + Math.random() * 900000));
        exec('touch ' + config.validation_codes_dir + user.email);
        exec('echo ' + validationCode + " > " + config.validation_codes_dir + user.email);
        deleteValidationCodeAfterTenMinutes(user.email);

        //send mail
        transporter.sendMail({
            from: config.email,
              to: user.email,
              subject: 'BALTA - Récupération de mot de passe',
              html: `<h2> Veuillez entrer le code ci-dessous sur le site de BALTA pour récupérer votre mot de passe </h2><br> <h3> CODE : ${validationCode} </h3><br> <p>Attention ce code expire dans 10 minutes</p> <br> <p> Cordialement,<br> L'équipe BALTA. </br> </p> `
            }, (error) => {
                if(error){
                    return res.status(500).json({
                        message : "Erreur lors de l'envoi du mail : \n" + error,
                        success: false
                     });
                }
                return res.status(200).json({
                    message : "Un code de validation a été envoyé à l'adresse : " + user.email,
                    success : true
                })
            });

    } catch(e) {
        return res.status(500).json({
           message : "Erreur lors du traitement de l'oubli de mot de passe. : \n\n" + e,
           success: false
        });
    }
}

async function deleteValidationCodeAfterTenMinutes(email: String) {
    setTimeout(function(){
        exec('rm ' + config.validation_codes_dir + email);
    }, 600000); // 600000ms = 10min
}

const validateCode = async (req: Request, res: Response, next: NextFunction) => {
    // vérifier si le fichier portant le code existe toujours
    const email: String = req.body.email;
    let input_code: String = req.body.code;

    try {
        let code: String = await new Promise((resolve) => {
            exec("cat " + config.validation_codes_dir + email, 
            (error, stdout) => {
                if(error){
                    return res.status(500).json({
                        message : "Le code a expiré. Veuillez réessayer. \n" + error,
                        success: false
                     });
                }
                else
                    resolve(stdout);
            });
        })

        //remove invisble characters
        input_code.split(" ").join("");
        code.split(" ").join("");
        code = code.substring(0, code.length - 1);

        console.log(code + " : " + input_code);

        if(input_code === code) {
            return res.status(200).json({
                message : "Vous allez pouvoir changer votre mot de passe",
                success : true
            });
        }
        else if(input_code !== code) {
            return res.status(500).json({
                message : "Le code est invalide. Réessayer.",
                success: false
            });
        }
    } catch(e) {
        return res.status(500).json({
            message : "Erreur lors de la vérification du code de validation. : \n\n" + e,
            success: false
        });
    }
}

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    let password = req.body.password;
    let user = await User.findOne({ email: req.body.email });
    
    console.log(user);
    
    bcryptjs.hash(password, 10, (hashError: { message: String; }, hash: any) => {
        if (hashError) {
            return res.status(401).json({
                message: "Erreur lors du hash du mot de passe.",
                success: false
            });
        }

        if (!user) {
            return res.status(400).json({
                message: "L'email renseigné n'existe pas.",
                success: false
            });
        }

        user.password = hash;

        // save the user and return the status
        return user.save()
        .then((user: any) => {
            return res.status(201).json({
                message : "Mot de passe changé avec succès !",
                success : true
            });
        })
        .catch((error: { message: any; }) => {
            return res.status(500).json({
                message: "Erreur lors du changement de mot de passe.",
                success : false
            });
        });
    });
}
 
export default { validateToken, register, login, forgottenPassword, validateCode, changePassword};