import { Request, Response , NextFunction} from "express"; 
import users from "../models/users";
import mongoose from "mongoose";
import bcryptjs, {hash} from "bcryptjs";

const login =  (req : Request, res : Response, next : NextFunction) => {

};

const getAllUsers =  (req : Request, res : Response, next : NextFunction) => {
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
/*const validateToken =  (req : Request, res : Response, next : NextFunction) => {
     return res.status(200).json({message : "Authorized"});
};
const register =  (req : Request, res : Response, next : NextFunction) => {
    let {username, password} = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
       if(hashError){
           return res.status(500).json({
               message : hashError.message,
               error : hashError
           })
       }
       //TODO : Insert user into Mongodb
    });
};*/

export default {getAllUsers, login};