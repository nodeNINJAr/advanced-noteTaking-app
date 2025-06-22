import express, { Application, Request, Response } from "express";
import noteRoute from "./controllers/note-controllers";
import { userRoute } from "./controllers/user-controller";
const app:Application = express();

// middleware
app.use(express.json());

// 
app.use('/notes', noteRoute);
// users
app.use('/users', userRoute)



// base
app.get('/', (req:Request, res:Response) => {
  res.send('App server is working')
})

export default app;


