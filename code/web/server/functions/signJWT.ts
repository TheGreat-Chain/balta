import jwt from 'jsonwebtoken';
import config from "../config/config";

import IUser from "../interfaces/users";

/**
const signJWT = (user: IUser, callback : (error : Error | null, token : string | null) => void): void => {
    let time : number = new Date().getTime();
    let expirationTime : number = time + Number(config.server.token.expirationTime) * 100000;
    let expirationTimeInSec : number =  Math.floor(expirationTime/ 1000)

    try {
        jwt.sign({
            mail: user.email
        }, config.server.token.secret, {
            issuer: config.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSec
        }, (error, token) => {
            if (error) {
                callback(error, null);
            } else if (token) {
                callback(null, token);
            }
        });
    } catch (error : any) {
        callback(error, null);
    }
};

export default signJWT;*/