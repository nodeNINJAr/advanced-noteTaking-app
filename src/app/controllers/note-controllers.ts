import express, { Request, Response }  from 'express';
import noteSchema from '../models/note-models';
import { model } from 'mongoose';

// 
const noteRoute = express.Router()
// note model
const Note = model('Note', noteSchema)


noteRoute.post('/cerate-note', async(req:Request, res:Response) => {
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
noteRoute.get('/', async(req:Request, res:Response) => {
   const notes = await Note.find();

  res.send({
      succes:true,
       message:'all notes fetch succesfully',
       notes:notes
  })
})

// get single note
noteRoute.get('/:id', async(req:Request, res:Response) => {
    const {id} = req.params;
    const note = await Note.findById(id);

  res.send({
      succes:true,
       message:'one note fetch succesfully',
       note:note
  })
})

// update single note
noteRoute.patch('/:id', async(req:Request, res:Response) => {
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
noteRoute.delete('/:id', async(req:Request, res:Response) => {
    const {id} = req.params;
    const note = await Note.findByIdAndDelete(id); // new true for fetching new data instantly
   //  
  res.send({
       succes:true,
       message:'note deleted succesfully',
       note:note
  })
})

export default noteRoute;