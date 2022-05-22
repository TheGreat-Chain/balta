/**
 * 
 * File : MCQSchema.ts
 * MCQ schema representing the MCQTest interface.
 * 
 * -----------------------------------------------------------
 * 
 * To get started with Mongoose in TypeScript, we need to :
 *  1. Create an interface reprensenting a document in MongoDB
 *  2. Create a Schema correspondig to the document interface.
 *  3. Create a Model.
 *  4. Connext to MongoDB
 * 
 * In this directory we created the SCHEMAS for documents in MongoDB.
 * More here : https://mongoosejs.com/docs/typescript.html
 * 
 * @author Balta Team
 */

import mongoose, { Schema } from 'mongoose';
import MCQTest from '../interfaces/MCQInterface';

/**
 * A type representing any email address.
 */
 const emailType =  {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
}

const MCQSchema : Schema = new Schema (
    {
        "user_email" : emailType,

        "titre" : {
            type: String,
            required: true
        },

        "date" : {
            type:String,
            required: true,
        },

        "duree" : {
            type: Number, //a voir si on garde
            required : true
        },

        "nombre_copies" : {
            type : Number,
            required : true
        },

        "totalPoints" : {
            type : Number,
            required: true
        },

        "questions" : [
            {
                "intitule" : {
                    type : String,
                    required : true
                },
                
                "points" : {
                    type : Number,
                    required: true
                },

                "hasMultChoices" : {
                    type : Boolean,
                    required: true
                },

                "reponses" : [
                    {
                        "content" : String,
                        "isGoodAnswer" : Boolean
                    }
                ]
            }
        ]
    },

    {
        timestamps : true,
        collection : 'MCQTests'
    }
);

export default mongoose.model<MCQTest>('MCQModel', MCQSchema);
 