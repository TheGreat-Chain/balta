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
  * @id MCQ test unique identifiant
  * @creator User that created this MCQ test. Him only can see, edit or delete the MCQ.
  * @markingScheme Sum of the marking of every question of the MCQ Test
  * @questions Questions of the MCQ Test that has to be answered
  */
 interface MCQTest extends Document {
     _id : Types.ObjectId,
     creator : Schema,
     markingScheme : number, // = barème
     questions : Question[]
 }

/**
 * Customized type representing a question in a MCQ test.
 * 
 * @id question id
 * @title question title. e.g : "When was Napoleon born ?"
 * @possibleAnswers : Answer type -> all the possible answers for a question
 * @markingScheme number points can you obtain by completing this question correctly
 */
type Question = {
    _id : mongoose.Types.ObjectId,
    title : String, 
    possibleAnswers : Answer[],
    markingScheme : number
 }

/**
 * Customized type representing a possible answer for a question in a MCQ test.
 * 
 * @id answer id
 * @title Answer title. eg : 15 August of 1769
 * @isCorrectAnswer Wether the answer is correct or not. IDEA : make a scale to permit the user to weight every answer. (answerWeight property)
 */
type Answer = {
    _id : mongoose.Types.ObjectId,
    title : String,
    isCorrectAnswer : boolean
 }

 export { Question, Answer };
 export default MCQTest; 