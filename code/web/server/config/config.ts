import dotenv from 'dotenv';

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

const SERVER = {
    host : SERVER_HOST,
    port : SERVER_PORT
}

const config = {
    server : SERVER,
    mongo : MONGO
}

export default config;