import express, { Request, Response } from 'express';
import { User } from './db';
import { generateOTP } from './helper/helper';
import { sendEmail } from './Controller/sendEmail.auth';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, PORT } from './config';
import { Validation } from './helper/newUserValidation';
import { router } from './routes/auth_route';
import { contentRouter } from './routes/content_route';
const app = express();

app.use(express.json());

app.use('/auth', router)

app.use('/content',contentRouter)
app.listen(PORT,()=>{
    console.log('server is running');
})

