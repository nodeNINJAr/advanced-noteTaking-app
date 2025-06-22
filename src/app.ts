import express, { Application, Request, Response } from "express";
import noteRoute from "./controllers/note-controllers";
const app:Application = express();

// middleware
app.use(express.json());

// 
app.use('/notes', noteRoute)



// base
app.get('/', (req:Request, res:Response) => {
  res.send('App server is working')
})

export default app;


