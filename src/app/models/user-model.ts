import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethod, UserStaticMethod, } from "../interfaces/user.interfaces";
import validator from "validator";
import bcrypt from "bcryptjs";
import noteSchema, { Note } from "./note-models";




// embeded schema for better type checking
export const addressSchema= new Schema<IAddress>({
        city:String,
        street:String,
        zip:Number,
},{
   _id:false
})


const userSchema =  new Schema<IUser,UserStaticMethod, UserInstanceMethod>({
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

//typescript generic method
userSchema.method("hashPassWord", async function(plainPassword:string) {
      const salt = await bcrypt.genSalt(10);
      const hashPassWord = await bcrypt.hash(plainPassword, salt);
      return hashPassWord;
})

//typescript static method
userSchema.static("hashPassWord", async function(plainPassword:string){
      const salt = await bcrypt.genSalt(10);
      const hashPassWord = await bcrypt.hash(plainPassword, salt);
      return hashPassWord;
})

// pre middleware
// post Hooks
userSchema.pre("save",async function(next){
   // console.log("per-midddleware",this);
      const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
     next();
})


// query middleware
userSchema.pre("find", async function(next,doc){
   console.log("all doc",doc);
   next();
})



// query middleware
// find and delete all note when user will deleted
userSchema.post("findOneAndDelete", async function(doc,next){
      if(doc){
          console.log(doc);
          await Note.deleteMany({user: doc._id})
      }
      next();
})



// Post hooks
//  document  middleware
userSchema.post("save", function(doc, next) {
    console.log(`${doc.email} has been saved`);
    next();
})

// virtual middleware
userSchema.virtual('fullName').get(function(){
     return `${this.firstName} ${this.lastName}`;
})





export const User = model<IUser, UserStaticMethod>("User", userSchema)