/**
 * File: signJWT.ts
 * 
  * The JSON Web Token allows data to be transmitted between 2 parties securely and in the form of JSON objects.
  * The party receiving a JWT is sure that it belongs to the correct owner
  * because it is signed.
  *
  * Here we create the signature middleware of the JWT.
  * 
 * Plus d'infos ici : https://jwt.io/introduction 
 * 
 * @author Balta Team
 * */
 import jwt from 'jsonwebtoken';
 import config from "../config/config";
 import logging from '../config/logging';
 
 import IUser from "../interfaces/userInterface";
 
 /**
  * Signing the JWT in order to certify that only the party holding the private key is the one 
  * that signed it.
  * 
  * @param user The user's email will be used in the payload. 
  * @param callback 
  */
 const signJWT = (user: IUser, callback : (error : Error | null, token : string | null) => void): void => {
 
     let time : number = new Date().getTime();
     let expirationTime : number = time + Number(config.server.token.expirationTime) * 100000;
     let expirationTimeInSec : number =  Math.floor(expirationTime / 1000);
 
     logging.log('Auth', `Attempting to sign token for ${user._id}`);
 
     try {
         jwt.sign(
             { mail: user.email }, // payload
             config.server.token.secret, //secret key
             {   
                 // options
                 issuer: config.server.token.issuer,
                 algorithm: 'HS256',
                 expiresIn: expirationTimeInSec
             }, 
             (error, token) => {
                 if (error) {
                     callback(error, null);
                 } else if (token) {
                     callback(null, token);
                 }
             });
 
     } catch (error) {
         console.log(error);
     }
 };
 
 export default signJWT;