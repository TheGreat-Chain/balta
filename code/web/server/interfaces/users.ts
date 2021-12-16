import { Document } from "mongoose";

export default interface User extends Document {
    userName : string, 
    email : string,
    password : string,
    registrationDate : Date
}