import express, {Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";
import postRoutes from "../routes/posts";
import config from "../config/config"
const app = express();

//pour lancer le serveur, taper dans un terminal : npm run start 
//toutes les requêtes reçues vont être formatées en json
app.use(bodyParser.json());

//TODO faire le cors
app.use(cors());

//connection à la base de données
mongoose.connect(config.mongo.url)
    .then(() => app.listen(config.server.port,() => console.log(`Server running on port : ${config.server.port}`)))
    .catch((error : Error) => console.log("Message d'erreur : " + error.message));
    
