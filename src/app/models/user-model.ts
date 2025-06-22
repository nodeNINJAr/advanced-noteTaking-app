import { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interfaces";


export const userSchema =  new Schema<IUser>({
   firstName:{
      type:String,
      required:true
   },
   lastName:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true,
      trim:true
   },
   password:{
      type:String,
      required:true,
      trim:true
   },
   role:{
       type:String,
       enum:["user", "admin"],
       default:"user"
   }
},
{
    versionKey:false,
    timestamps:true
}


)

