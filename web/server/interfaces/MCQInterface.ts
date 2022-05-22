/**
 * 
 * File : MCQInterface.ts
 * Interface representing the MCQTests document in mongoDB.
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

 import mongoose, { Types, Schema } from "mongoose";

 /**
  * Interface representing the MCQ document in mongodb.
  * 
  * @user_email email of the user
  * @title titre du QCM
  * @date date de création du QCM
  * @exemplaire nombre de copies 
  * @totalPoints QCM noté sur ce nombre de points
  * @questions tableau de questions, chaque question étant composée de :
  *     @intitule de la question
  *     @points qu'apporte cette question
  *     @hasMultChoice plusieurs réponses correctes 
  *     @reponses tableau de réponses, chaque réponse étant composée de :
  *         @content contenu de la réponse
  *         @isGoodAnswer booléen, true si bonne réponse false sinon
  */
 interface MCQTest extends Document {
    "user_email" : String,
    "titre" : String,
    "date" : String,
    "duree" : number,
    "exemplaire" : number,
    "totalPoints" : number,
    "questions" : [
        {
            "intitule" : string,
            "points" : number,
            "hasMultChoices" : boolean,
            "reponses" : [
                {
                    "content" : string,
                    "isGoodAnswer" : boolean
                }
            ]
        }
    ]
}

export default MCQTest; 