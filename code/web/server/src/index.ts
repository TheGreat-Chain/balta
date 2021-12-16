import express, {Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import cors from "cors";
import postRoutes from "../routes/posts";
import usersRoutes from "../routes/users";
import config from "../config/config"
const server = express();

//pour lancer le serveur, taper dans un terminal : npm run start 
//toutes les requêtes reçues vont être formatées en json
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : true}));

//TODO comprendre le cors
server.use(cors());

//connection à la base de données
mongoose.connect(config.mongo.url,config.mongo.options)
    //Si la connexion à la base de donnée est réussie, alors le serveur se connecte au port spécifié 
    .then(() => server.listen(config.server.port,() => console.log(`Server running on port : ${config.server.port}`)))
    .catch((error : Error) => console.log("Message d'erreur : " + error.message));
    
//* Les routes sont déclarées ici *//
server.get('/api/users',usersRoutes);

server.get('/api', (req :Request, res :Response) =>  {
    res.send('It works');
});