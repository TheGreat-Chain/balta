/**
 * 
 * File : users.ts
 * Interface representing the Users document in mongoDB.
 * 
 * -----------------------------------------------------------
 * 
 * To get started with Mongoose in TypeScript, we need to :
 *  1. Create an interface reprensenting a document in MongoDB
 *  2. Create a Schema correspondig to the document interface.
 *  3. Create a Model.
 *  4. Connext to MongoDB
 * 
 * In this directory we created the interfaces for documents in MongoDB.
 * More here : https://mongoosejs.com/docs/typescript.html
 * 
 * @author Balta Team
 */

import { Document } from "mongoose";

export default interface IUser extends Document {
    username: string, 
    email : string,
    password : string,
    projectPath : string,
    registrationDate : Date,
    UserMCQs : [{
        "user_email" : string,
        "titre" : string,
        "date" : string,
        "duree" : number,
        "exemplaire" : number,
        "questions" : [
            {
                "intitule" : string,
                "hasMultChoices" : boolean,
                "reponses" : [
                    {
                        "content" : string,
                        "isGoodAnswer" : boolean
                    }
                ]
            }
        ]
    }]
}