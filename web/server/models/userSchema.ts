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
 * A required String.
 * Usage : force users to complete forms. */
const requiredString = {
    type : String,
    required : true 
} 

/**
 * A type representing any email address.
 */
const emailType =  {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
}

/**
 * The schema reprensenting the User interface (Iuser)
 */
const UserSchema : Schema = new Schema (
    {
        username : requiredString,
        email : emailType,
        password : requiredString,
        projectPath: requiredString,
        registrationDate : {
            //date sous format 'timestamp' (nbres de secondes écoulées depuis le)
            type : Date,
            required : true,
            default : Date.now()
        }
    },
    
    {
        timestamps : true,
        collection : 'Users'
    }
);


export default mongoose.model<IUser>('User', UserSchema);