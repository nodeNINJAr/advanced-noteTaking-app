import express, { Request, Response }  from 'express';
import { model } from 'mongoose';
import { userSchema } from '../models/user-model';
import { z } from 'zod';
  
  
export const userRoute = express.Router();
// 
const CreateUserZodSchema = z.object({
    firstName:z.string(),
    lastName:z.string(),
    age:z.number(),
    email:z.string(),
    password:z.string(),
    role:z.string().optional()

})

// 
const User = model("User", userSchema)
//   
  userRoute.post('/create-user', async(req:Request, res:Response) => {
        
    try{
    //  const data = await CreateUserZodSchema.parseAsync(req.body);
    //   methood 1
    //   const myUser = new User(data)
    //   await myUser.save();
    
    // methood 2
    const myUser = await User.create(req.body);
      
      res.status(201).send({
          success:true,
          message:"User created succesfully",
          user:myUser
      })
    }catch(err){
      console.log(err);
          res.status(400).json({
          success:false,
          message:err.message,
          err
      })
    }
  })
  
  
  // get all Users
  userRoute.get('/', async(req:Request, res:Response) => {
     const users = await User.find();
  
    res.send({
        succes:true,
         message:'all Users fetch succesfully',
         users:users
    })
  })
  
  // get single User
  userRoute.get('/:id', async(req:Request, res:Response) => {
      const {id} = req.params;
      const user = await User.findById(id);
  
    res.send({
        succes:true,
         message:'one User fetch succesfully',
         user:user
    })
  })
//   
// update single note
userRoute.patch('/:id', async(req:Request, res:Response) => {
    const {id} = req.params;
    const updatedData = req.body;
    // methoods **updateOne **findByIdAndUpdate **findOneAndUpdate
    const user = await User.findByIdAndUpdate(id, updatedData,{new:true}); // new true for fetching new data instantly
   //  
  res.send({
       succes:true,
       message:'user  updated fetch succesfully',
       user:user
  })
})



// delete single note
userRoute.delete('/:id', async(req:Request, res:Response) => {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id); // new true for fetching new data instantly
   //  
  res.send({
       succes:true,
       message:'user deleted succesfully',
       note:user
  })
})