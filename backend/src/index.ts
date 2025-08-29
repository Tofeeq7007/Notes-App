import express, { Request, Response } from 'express';
import { User } from './db';
import { generateOTP } from './helper/helper';
import { sendEmail } from './Controller/sendEmail.auth';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';
import { Validation } from './helper/newUserValidation';
import { router } from './routes/auth_route';
const app = express();

app.use(express.json());

app.use('/auth', router)


app.listen(3000,()=>{
    console.log('server is running');
})