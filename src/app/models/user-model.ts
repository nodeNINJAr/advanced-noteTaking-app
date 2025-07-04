import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethod } from "../interfaces/user.interfaces";
import validator from "validator";
import bcrypt from "bcryptjs";




// embeded schema for better type checking
export const addressSchema= new Schema<IAddress>({
        city:String,
        street:String,
        zip:Number,
},{
   _id:false
})


const userSchema =  new Schema<IUser, Model<IUser>, UserInstanceMethod>({
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
      trim:true,
   //    validate:{
   //       validator: function(v){
   //           return /^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(v)
   //       },
   //       message:p=>`${p.value} is not a valid email`
   //    }
        validate:[validator.isEmail, "Invalid Email {VALUE}"]
   },
   password:{
      type:String,
      required:true,
      trim:true
   },
   role:{
       type:String,
       uppercase:true,
       enum:{
          values:["USER", "ADMIN","SUPERADMIN"],
          message:'{VALUE} Is not supported'
       },
       default:"USER"
   },
   address:{
        type:addressSchema
   }
},
{
    versionKey:false,
    timestamps:true
}  


)


userSchema.method("hashPassWord", async function(plainPassword:string) {
      const salt = await bcrypt.genSalt(10);
      const hashPassWord = await bcrypt.hash(plainPassword, salt);
      return hashPassWord;
})


export const User = model("User", userSchema)