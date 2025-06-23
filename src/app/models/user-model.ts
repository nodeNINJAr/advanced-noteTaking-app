import { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interfaces";


export const userSchema =  new Schema<IUser>({
   firstName:{
      type:String,
      required:true,
      trim:true,
      minlength:[5, "firstname must be at least 5 char "],
      maxlength:10
   },
   lastName:{
      type:String,
      required:true,
      trim:true
   },
   age:{
     type:Number,
     required:true,
     trim:true,
     min:[18,"Age must be min 18"],
     max:40   
   },
   email:{
      type:String,
      unique:true,
      required:true,
      lowercase:true,
      trim:true
   },
   password:{
      type:String,
      required:true,
      trim:true
   },
   role:{
       type:String,
       uppercase:true,
       enum:["USER", "ADMIN","SUPERADMIN"],
       default:"USER"
   }
},
{
    versionKey:false,
    timestamps:true
}  


)

