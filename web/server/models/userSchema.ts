/**
 * 
 * File : userSchema.ts
 * User schema representing the Interface User (IUser).
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
 import IUser from '../interfaces/userInterface';

 /**
  * The schema reprensenting the User interface (Iuser)
  */
 const emailType =  {
     type: String,
     required: true,
     match: /.+\@.+\..+/,
     unique: true
 }

 const requiredNumber =  {
     type : Number,
     required : true
}

const requiredString =  {
    type : String,
    required : true
}

const requiredBoolean = {
     type : Boolean,
    required : true
}

 const UserSchema : Schema = new mongoose.Schema({
         username : {
             type: String,
             required: true,
             min: 4,
             max: 20,
         },
 
         email : {
             type : emailType
         },
 
         password : {
             type: String,
             required: true,
             min: 6,
             max: 32
         },
 
         registrationDate : {
             //date sous format 'timestamp' (nbres de secondes écoulées depuis le 1e janvier 1970)
             type : Date,
             required : true,
             default : Date.now()
         },
        UserMCQs : [ {
            "titre" : requiredString,

            "date" : requiredString,

            "duree" : requiredNumber,

            "nombre_copies" : requiredNumber,

            "questions" : [
                {
                    "intitule" : requiredString,

                    "points" : requiredNumber,

                    "hasMultChoices" : requiredBoolean,

                    "reponses" : [
                        {
                            "content" : String,
                            "isGoodAnswer" : Boolean
                        }
                    ]
            }]
     }]},

     {
         timestamps : true,
         collection : 'Users'
     }
 );
 
 
 export default mongoose.model<IUser>('User', UserSchema);