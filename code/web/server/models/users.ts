import mongoose,{ Schema } from 'mongoose';
import User from '../interfaces/users';

const requiredString = {
    type : String,
    required : true 
} 

const UserSchema : Schema = new Schema (
    {
        username : requiredString,
        email : requiredString,
        password : requiredString,

        //date sous format 'timestamp' (nbres de secondes écoulées depuis le)
        registrationDate : {
            type : Date,
            required : true,
            default : Date.now()
        }
    },
    {
        timestamps : true
    }
);

export default mongoose.model<User>('User',UserSchema);