import { Request, Response , NextFunction} from "express"; 
import users from "../models/users";
import mongoose from "mongoose";

const createUser =  (req : Request, res : Response, next : NextFunction) => {
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

export default {getAllUsers};