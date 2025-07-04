import { INotes } from './../interfaces/note-interface';
import { Schema } from "mongoose";

// schema
const noteSchema = new Schema<INotes>({
      title:{
         type:String,
         required:true,
         trim:true
      },
      content:{type:String, default:""},
      category:{
          type:String,
          enum:["personal", 'work', 'study', 'others'],
          default:"personal"
      },
      pinned:{
        type:Boolean,
        default:false,
      },
      tags:{
        label:{type:String, required:true},
        color:{type:String, default:"gray"}
      },
        user:{
           type:Schema.Types.ObjectId,
           ref:"User",
           required:true
        }
    
},{
    versionKey:false,
    timestamps:true
}

);


export default noteSchema;