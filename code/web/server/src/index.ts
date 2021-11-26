import express, {Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "../routes/posts";
const app = express();

app.use('/', postRoutes);

app.use(cors());
//TODO : METTRE LES IDENTIFIANTS DANS UN FICHIER .env
const CONNECTION_URL : string = 'mongodb+srv://lucas:Y6cP9ebPhU34ygYC@lucascluster.by24p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT,() => console.log(`Server running on port : ${PORT}`)))
    .catch((error : Error) => console.log("Message d'erreur : " + error.message));
    
