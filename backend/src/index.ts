import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import roomRoutes from './routes/rooms';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//middlewares
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);



app.listen(4000, ()=>{
    console.log("server is running at localhost:4000")
})