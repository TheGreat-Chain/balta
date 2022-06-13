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

    if(username === ""){
        res.status(400).json({
            messsage :"Aucun username renseigné",
            success : false});
        return
    }else if(email === "") {
        res.status(400).json({
            messsage: "Aucun email renseigné",
            success: false
        });
        return
    }else if(password === "") {
        return res.status(400).json({
            messsage: "Aucun password renseigné",
            success: false
        });
    }

    //Verify if an email is correct

     // Regular expression to check if string is email
     const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

     if(!regexExp.test(email)){
         return res.status(400).json({
             messsage: "L'email n'est pas valide.",
             success: false
         });
     }

    // Verify password length
    if(password.length <= 6) {
        return res.status(400).json({
            messsage: "Le mot de passe est trop court",
            success: false
        });
    }

    // Existing email ? :
    const loginExist = await User.findOne({ email: email});
    if(loginExist) {
        return res.status(400).json({
            messsage: "L'adresse email est déjà utilisée.",
            success: false
        });
    }
    
    // Hash the password before storing the user
     bcryptjs.hash(password, 10, (hashError: { message: String; }, hash: any) => {
         if (hashError) {
             return res.status(401).json({
                 message: hashError.message,
                 error: hashError
             });
         }

         const user = new User({
             _id: new mongoose.Types.ObjectId(),
             username,
             email,
             password: hash,
             registrationDate : Date.now(),
             UserMCQs : []
         });

         // Create an AMC folder for every new user
         createNewProject(user.email);
 
         return user.save()
             .then((user: any) => {
                 return res.status(201).json({
                     user,
                     success : true
                 });
             })
             .catch((error: { message: any; }) => {
                 return res.status(500).json({
                     message: error.message,
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

    // Existing email ? :
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({
            messsage: "Incorrect login",
            success: false
        });
    }

    // Passwords match ? :
    const validPassword = await bcryptjs.compare(req.body.password, user.password);

    if(!validPassword) {
        return res.status(400).json({
            messsage: "Incorrect password",
            success: false
        });
    }

    try {
        // Validation of user inputs
        const { error } = await loginSchema.validateAsync(req.body);
        
        if(error) {
            return res.status(400).json(error);
        } else {
            await signJWT(user, function (_error, token) {
                if (_error) {
                    return res.status(500).json({
                        message: _error.message,
                        error: _error,
                        success : false
                    });
                } else if (token) {
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        user: user,
                        success : true
                    })
                }
            });
        }
    } catch(e) {
        res.status(500).send(e);
    }
 };
 
 /** 
  * To get all the users from the Users collection in MongoDB.
  * 
  * @param req : Client request object
  * @param res : Server response object
  * @param next : Next function
  * @returns : all the users from the Users collection in MongoDB.
  * 
  * To know how it works : https://devdocs.io/mongoose/api/model
  * 
  */
 const getAllUsers =  (req : Request, res : Response, next : NextFunction) => {
    User.find()
    .select('-password') //To exclude the password when requesting the user documents
    .exec() // executes the query and returns a promise
    .then((results: string | any[]) => {
        return res.status(200).json({
            users : results,
            counts : results.length
        });
    })
    .catch((error: { message: any; }) => {
        return res.status(500).json({
            message : error.message,
            error
        });
    });
};
    /**
     * !! TO CONTINUE :  DOESNT DELETE THE RESSOURCE !!
     * 
     * Deletes the user that does the request (? use with jwt ?)
     * @param req 
     * @param res 
     * @param next 
     */
    const deleteUser = function(req : Request, res : Response, next : NextFunction ) {
        User.deleteOne({ email : req.body.email}) 
        .then(function () {
            console.log('Utilisateur supprimé');
            return res.status(200);
        }).catch(function(err: Error) {
            console.log(err);
            return res.status(400);
        })
    }

     /** Creates a new AMC-Latex project. 
  *  It is a unique folder that has the userID as a name.
  *  Not a callback function.
  * 
  * @userID : 1 user <=> 1 folder. To keep every folder unique, they are named as the user's id in mongoDB
  * @return : the error message if there is one
  */
  function createNewProject(userEmail: String) {

    let projectPath = `$HOME/Projets-QCM/${userEmail}`;

    exec(`mkdir ${projectPath}/$1 && mkdir ${projectPath}/$1/cr && mkdir ${projectPath}/$1/cr/corrections && mkdir ${projectPath}/$1/cr/corrections/jpg && mkdir ${projectPath}/$1/cr/corrections/pdf && mkdir ${projectPath}/$1/cr/diagnostic && mkdir ${projectPath}/$1/cr/zooms && mkdir ${projectPath}/$1/data && mkdir ${projectPath}/$1/exports && mkdir ${projectPath}/$1/scans && mkdir ${projectPath}/$1/copies`
        , (error, stdout, stderr) => {
            if(error) {
                console.log(error.message);
                return error.message;
            }
            if(stderr) {
                console.log(stderr)
                return stderr
            }
            console.log(stdout);
     });
}

let testAccount = nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        //user: testAccount.user, // generated ethereal user
        //pass: testAccount.pass, // generated ethereal password
    },
});

/**
const sendForgotPassword : RequestHandler = async(req: Request, res: Response, next: NextFunction) => {
    const {email} : {email : String}= req.body;
    try{
        const user = await users.findOne({email});
        if(!user) return res.status(404).json({
            message : 'Email not valid'
        });
        const encryptedToken = await bcryptjs.hash(user.id.toString(),8);

        let mail = transporter.sendMail
    }
};
*/
 
 export default { validateToken, register, login, getAllUsers, deleteUser };