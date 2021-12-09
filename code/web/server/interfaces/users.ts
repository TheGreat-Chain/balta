import { UUID } from "bson";
import { Document } from "mongoose";

export default interface User extends Document {
    id : UUID,
    userName : string, 
    email : string,
    password : string,
    registrationDate : Date
}