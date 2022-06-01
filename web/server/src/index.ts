import express, {Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "../routes/userRoutes";
import config from "../config/config";

// Server instanciation and settings 
const server = express(); //pour lancer le serveur, npm run start 
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : true}));
server.use(cors());

server.use('/api/user', userRoutes);
server.get('/api', (req :Request, res :Response) =>  {
    res.send('Ca marche !');
});
// Database connection 
mongoose.connect(config.mongo.url,{})
    //Si la connexion à la base de donnée est réussie, alors le serveur se connecte au port spécifié 
    .then(() => server.listen(config.server.port,() => console.log(`Server running on port : ${config.server.port}`)))
    .catch((error : Error) => console.error("Message d'erreur : " + error.message));