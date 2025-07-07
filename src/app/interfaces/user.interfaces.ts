import { Model } from "mongoose";

export interface IUser {
     firstName:string;
     lastName:string;
     age:number,
     email:string;
     password:string;
     role:"USER" | "ADMIN" |  "SUPERADMIN";
     address:{
        city:string,
        street:string,
        zip:number    
   }
}

// embeded interface
export interface IAddress{
        city:string,
        street:string,
        zip:number
}

export interface UserInstanceMethod {
    hashPassWord(password:string):string;
}
// 
export interface UserStaticMethod extends Model<IUser> {
    hashPassWord(password:string):string;
}