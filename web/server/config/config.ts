import dotenv from 'dotenv';
import {GetPublicKeyOrSecret, Secret} from "jsonwebtoken";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_URL;

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive : true,
  autoIndex: false,
  retryWrites : false  
};

const MONGO = {
    host : MONGO_HOST,
    username : MONGO_USERNAME,
    password : MONGO_PASSWORD,
    options : MONGO_OPTIONS,
    url : `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_HOST}`
}

const SERVER_HOST =  process.env.SERVER_HOST;
const SERVER_PORT = process.env.PORT;
const SERVER_TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME;
const SERVER_TOKEN_ISSUER = process.env.TOKEN_ISSUER
const SERVER_TOKEN_SECRET  = process.env.SECRET

const TOKEN = {
    expirationTime : SERVER_TOKEN_EXPIRATION_TIME || null,
    issuer : SERVER_TOKEN_ISSUER || null,
    secret : SERVER_TOKEN_SECRET || null
};
const SERVER = {
    host : SERVER_HOST,
    port : SERVER_PORT,
    token : TOKEN
}

const config = {
    server : SERVER,
    mongo : MONGO
}

export default config;