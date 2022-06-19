import express, {Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import cors from "cors";
import userRoutes from "../routes/userRoutes";
import config from "../config/config";
import { exec } from 'child_process';

// Server instanciation and settings 
const server = express(); //pour lancer le serveur, npm run start 
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : true}));
server.use(cors());
server.use(cookieParser());
server.use('/api/user', userRoutes);

// Dossier pour les codes de validation de mdp
try{
    exec('mkdir ' + config.validation_codes_dir);
} catch(e) {
    console.log("Erreur lors de la création de " + config.validation_codes_dir + "\n" + e);
}

// Database connection 
mongoose.connect(config.mongo.url,{})
    //Si la connexion à la base de donnée est réussie, alors le serveur se connecte au port spécifié 
    .then(() => server.listen(config.server.port,() => {
        console.log(`Server running on port : ${config.server.port}`);
    }))
    .catch((error : Error) => console.error("Message d'erreur : " + error.message));