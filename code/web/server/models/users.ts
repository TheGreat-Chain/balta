import { UUID } from 'bson';
import mongoose,{ Schema } from 'mongoose';
import User from '../interfaces/users';

const UserSchema : Schema = new Schema (
    {
        id : {
            type : UUID,
            required : true,
            unique : true
        },
        username : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
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