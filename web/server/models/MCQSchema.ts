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
import MCQTest, { Answer, Question } from '../interfaces/MCQInterface';

const MCQSchema : Schema = new Schema (
    {
        creator : { type : Schema, required : true },
        markingScheme : { type : Number, required : false },
        questions : { type : {} , required : false }, // type : Question => why the fuck ?? voir avec lucas / philippe
    }
);


export default mongoose.model<MCQTest>('MCQTest', MCQSchema);
 