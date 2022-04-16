import { Request, Response , NextFunction} from "express";
import User from "../models/users"
import * as mongoose from "mongoose";
import users from "../models/users";
import bcryptjs from "bcryptjs";
import signJWT from "../functions/signJWT";


export const register =  (req : Request, res : Response, next : NextFunction) => {
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

export const CreateUser = (req : Request, res : Response, next : NextFunction) => {
    let {username, email, password, projectPath, registrationDate} = req.body;

    const user =  new User({
        username,
        email,
        password,
        projectPath,
        registrationDate
    })
    return user.save()
        .then((result) => {
            return res.status(201).json({
                user : result
            })
        })
        .catch((error) => {
            return res.status(500).json({
                message :error.message,
                error
            });
        });
};

export const CreateQCM = (req : Request, res : Response, next : NextFunction) => {
  //TODO : Créer un QCM et l'ajouter au document d'un utilisateur
};

