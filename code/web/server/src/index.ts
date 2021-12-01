import express, {Request, Response, NextFunction, request} from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import graphql, { graphqlHTTP } from "express-graphql";
import {buildSchema} from 'graphql';
import dotenv from 'dotenv';
import cors from "cors";
import postRoutes from "../routes/posts";
import { Console } from "console";
import { schema } from "../api/schema";
import { rootCertificates } from "tls";
const app = express();



//toutes les requêtes reçues vont être formatées en json
app.use(bodyParser.json());

dotenv.config();

//TODO faire le cors
app.use(cors());

//Ne pas oublier ! à la fin => cela permet de rendre le type en string uniquement et non string ou null
const CONNECTION_URL : string = process.env.CONNECTION_URL!;
const PORT = process.env.PORT;


//connection à la base de données
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT,() => console.log(`Server running on port : ${PORT}`)))
    .catch((error : Error) => console.log("Message d'erreur : " + error.message));
    
//graphql middleware
app.use(process.env.GRAPHQL_PATH!,graphqlHTTP((request, response, graphQLparams) => ({
    schema = schema,
    rootValue = root,
    graphiql = true,
    context = {
        const packageName = require('packageName');
    }
)}));