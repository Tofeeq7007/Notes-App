import mongoose from 'mongoose';
import { MONGO_URL } from './config';

mongoose.connect(MONGO_URL)
    .then(()=> console.log('Connected to MongoDB'))
    .catch((err)=>console.error('MongoDB connection error:',err));

export interface IUser extends Document{
   name: string;
    dob?: string;
    email: string;
    OtpHash?: string | null;
    ExpireAt?: number | null;    
}    
const {Schema} = mongoose;
const userSchema = new Schema<IUser>({
    name: {
        type:String,
        required:true
    },
    dob:{
        type:String,
    },    
    email:{
        type:String,
        required:true,
        unique:true
    },
    OtpHash:{
        default:null,
        type:String
    },
    ExpireAt:{
        default:null,
        type:Number,
    }

})

export const User = mongoose.model("User",userSchema);