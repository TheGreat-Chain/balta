/**
 * 
 * File : userController.ts
 * All the callback functions corresponding to some routes.
 * Functions related to users :
 * - validateToken 
 * - register
 * - login
 * - getAllUsers
 * 
 * @author Balta Team
 */

 import { NextFunction, Request, Response } from 'express';
 import mongoose from 'mongoose';
 import bcryptjs from 'bcryptjs';

 import logging from '../config/logging';
 import User from '../models/userSchema';
 import signJWT from "../functions/signJWT";
 import { createNewProject } from "./AMCController"

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
 const register = (req: Request, res: Response, next: NextFunction) => {
    let {username, email, password, projectPath, registrationDate} = req.body;
    
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
             projectPath,
             registrationDate
         });

         // Create an AMC folder for every new user
         createNewProject(user._id);
 
         return user.save()
             .then((user: any) => {
                 return res.status(201).json({
                     user
                 });
             })
             .catch((error: { message: any; }) => {
                 return res.status(500).json({
                     message: error.message,
                     error
                 });
             });
     });
 };
 
 /**
  * In order to login for a registered user.
  * 
  * @param req : Client request object
  * @param res : Server response object
  * @param next : Next function
  * @returns Server response object
  */
 const login = (req: Request, res: Response, next: NextFunction) => {
     let { username, password } = req.body;
 
     // We search for users having this username
     User.find({ username })
         .exec() 
         .then((users: string | any[]) => {
             if (users.length !== 1) {
                 return res.status(401).json({
                     message: "Erreur 401 : Unauthorized. Plus d'un utilisateur demandé."
                 });
             }
            
             // Are the registered password and the password written by the user equal ?
             bcryptjs.compare(password, users[0].password, (error: any, result: any) => {
                 if (error) {
                     return res.status(401).json({
                         message: 'Erreur 401 : Unauthorized. Les mots de passe ne correspondent pas.'
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
                                 message: 'Succès. Connexion.',
                                 token: token,
                                 user: users[0]
                             });
                         }
                     });
                 }
             });
         })
         .catch((err: any) => {
             console.log(err);
             res.status(500).json({
                 error: err
             });
         });
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
 
 export default { validateToken, register, login, getAllUsers };