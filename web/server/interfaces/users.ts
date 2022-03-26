import { Document } from "mongoose";
//IUser =  InterfaceUser
export default interface IUser extends Document {
    userName : string, 
    email : string,
    password : string,
    projectPath : string,
    registrationDate : Date,

}