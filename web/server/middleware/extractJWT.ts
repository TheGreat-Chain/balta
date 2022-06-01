import {Request,Response,NextFunction} from "express";
import jwt from 'jsonwebtoken';
import config from "../config/config";
import logging from '../config/logging';


/**
 * Extracts and verifies the token on every client / other party request.
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns response.status as a json 
 */
const extractJWT =  (req : Request, res : Response, next : NextFunction) => {
    logging.log('Auth', 'Validating token');

    let token =  req.headers.authorization?.split(' ')[1];

    if (token){
        jwt.verify(token, config.server.token.secret, (error, decoded) =>{
            if(error){
                return res.status(404).json({
                   message : error.message,
                    error
                });
            }
            else{
                res.locals.jwt = decoded;
                next();
            }
        });
    }else {
        return res.status(401).json({
            message : 'Token refusé.'
        })
    }
};

export default extractJWT;