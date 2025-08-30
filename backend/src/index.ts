import express, { Request, Response } from 'express';
import { User } from './db';
import { generateOTP } from './helper/helper';
import { sendEmail } from './Controller/sendEmail.auth';
import jwt from 'jsonwebtoken';
import { FRONTEND_URL, JWT_SECRET, PORT } from './config';
import { Validation } from './helper/newUserValidation';
import { router } from './routes/auth_route';
import { contentRouter } from './routes/content_route';
import cors from "cors";


const app = express();

app.use(cors({
  origin: FRONTEND_URL, // your frontend origin
  credentials: true,               // allow cookies/auth headers
  allowedHeaders: ["Content-Type", "Authorization"] 
}));



app.use(express.json());

app.use('/auth', router)

app.use('/content',contentRouter)
app.listen(PORT,()=>{
    console.log('server is running');
})

