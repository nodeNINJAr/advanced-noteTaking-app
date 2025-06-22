import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app:Application = express();

// middleware
app.use(express.json());

// schema
const noteSchema = new Schema({
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
    
},{
    versionKey:false,
    timestamps:true
}

)
//  
const Note = model('Note', noteSchema)


app.post('/cerate-note', async(req:Request, res:Response) => {
  const data = req.body;
//   methood 1
//   const myNote = new Note(data)
//   await myNote.save();

// methood 2
const myNote = await Note.create(data);
  
  res.status(201).send({
      success:true,
      message:"Note created succesfully",
      note:myNote
  })
})


// get all notes
app.get('/notes', async(req:Request, res:Response) => {
   const notes = await Note.find();

  res.send({
      succes:true,
       message:'all notes fetch succesfully',
       notes:notes
  })
})

// get single note
app.get('/notes/:id', async(req:Request, res:Response) => {
    const {id} = req.params;
    const note = await Note.findById(id);

  res.send({
      succes:true,
       message:'one note fetch succesfully',
       note:note
  })
})

// update single note
app.patch('/notes/:id', async(req:Request, res:Response) => {
    const {id} = req.params;
    const updatedData = req.body;
    // methoods **updateOne **findByIdAndUpdate **findOneAndUpdate
    const note = await Note.findByIdAndUpdate(id, updatedData,{new:true}); // new true for fetching new data instantly
   //  
  res.send({
       succes:true,
       message:'note  updated fetch succesfully',
       note:note
  })
})



// delete single note
app.delete('/notes/:id', async(req:Request, res:Response) => {
    const {id} = req.params;
    const note = await Note.findByIdAndDelete(id); // new true for fetching new data instantly
   //  
  res.send({
       succes:true,
       message:'note deleted succesfully',
       note:note
  })
})


app.get('/', (req:Request, res:Response) => {
  res.send('App server is working')
})

export default app;


