import dotenv from "dotenv";
dotenv.config();
export const My_Email = process.env.MY_Email as string;
export const My_Password = process.env.MY_Password as string;
export const MONGO_URL = process.env.MONGODB_URL as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PORT = process.env.PORT as string;
