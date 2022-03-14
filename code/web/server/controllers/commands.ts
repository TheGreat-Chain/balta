import { Request, Response , NextFunction} from "express";
import User from "../models/users"
import * as mongoose from "mongoose";

export const getPosts = (req : Request, res : Response, next : NextFunction) => {
    res.send('IT WORKS.')
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

