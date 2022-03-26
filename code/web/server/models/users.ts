import mongoose,{ Schema } from 'mongoose';
import IUser from '../interfaces/users';

const requiredString = {
    type : String,
    required : true 
} 

const UserSchema : Schema = new Schema (
    {
        username : requiredString,
        email : requiredString,
        password : requiredString,
        projectPath: requiredString,
        //date sous format 'timestamp' (nbres de secondes écoulées depuis le)
        registrationDate : {
            type : Date,
            required : true,
            default : Date.now()
        }
    },
    {
        timestamps : true,
        collection : 'Utilisateurs'
    }
);


export default mongoose.model<IUser>('User',UserSchema);