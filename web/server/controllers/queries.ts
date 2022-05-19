import {Request, Response, NextFunction, RequestHandler} from "express";
import users from "../models/users";
import mongoose from "mongoose";
import bcryptjs, {hash} from "bcryptjs";
import signJWT from "../functions/signJWT";
import nodemailer from "nodemailer";

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




const login : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    users.find({ username })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }

            bcryptjs.compare(password, users[0].password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Password Mismatch'
                    });
                } else if (result) {
                    signJWT(users[0], (_error, token) => {
                        if (_error) {
                            return res.status(500).json({
                                message: _error.message,
                                error: _error
                            });
                        } else if (token) {
                            return res.status(200).json({
                                message: 'Auth successful',
                                token: token,
                                user: users[0]
                            });
                        }
                    });
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

const getAllUsers : RequestHandler =  (req : Request, res : Response, next : NextFunction) => {
    users.find()
    .exec()
    .then(results => {
        return res.status(200).json({
            users : results,
            counts : results.length
        });
    })
    .catch((error) => {
        return res.status(500).json({
            message : error.message,
            error
        });
    });
};

const validateToken : RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'Token(s) validated'
    });
};

const sendForgotPassword : RequestHandler = async(req: Request, res: Response, next: NextFunction) => {
    const {email} : {email : String}= req.body;
    /*try{
        const user = await users.findOne({email});
        if(!user) return res.status(404).json({
            message : 'Email not valid'
        });
        const encryptedToken = await bcryptjs.hash(user.id.toString(),8);

        let mail = transporter.sendMail
    }*/

};

export default {getAllUsers, login};