/**
 * File : config.ts
 * 
 * Definition of constants using environment variables thanks to the dotenv library.
 * More here : https://www.npmjs.com/package/dotenv
 * 
 * @Author : Balta Team
 */

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

/**  Username to log in the mongo database */
const {MONGO_USERNAME, MONGO_PASSWORD, MONGO_URL: MONGO_HOST, VALIDATION_CODE_DIR, EMAIL, EMAIL_PASSWORD} = process.env;

/** The Mongo database object */
const MONGO = {
    host : MONGO_HOST,
    username : MONGO_USERNAME,
    password : MONGO_PASSWORD,
    url : `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_HOST}`
}

/** Where the code is running */
const SERVER_HOSTNAME =  process.env.SERVER_HOSTNAME || 'localhost';

/** On which port the server communicates */
const SERVER_PORT = process.env.PORT || '3001';

/** Expiration time of a JWT, after what the token becomes invalid */
const SERVER_TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME || 3600;

/** JWT transmiter */
const SERVER_TOKEN_ISSUER = process.env.TOKEN_ISSUER || 'Balta';

/** Secret used in the JWT signature */
const SERVER_TOKEN_SECRET  = process.env.TOKEN_SECRET || '164653832019882386597233176106' ; 

/** An object representing a JWT given to a user - ? useful ? */
const TOKEN = {
    // NE PAS OUBLIER DE METTRE UNE VALEUR SUPLEMENTAIRE SINON BUG
    expirationTime : SERVER_TOKEN_EXPIRATION_TIME || 3600,
    issuer : SERVER_TOKEN_ISSUER,
    secret : SERVER_TOKEN_SECRET
};

/** Object representing our server */
const SERVER = {
    hostname : SERVER_HOSTNAME,
    port : SERVER_PORT,
    token : TOKEN
}

/** Object containing the application server and database configurations */
const config = {
    server : SERVER,
    mongo : MONGO
}



export default config;