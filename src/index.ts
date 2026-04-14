import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import chatRoutes from './routes/chat.js';

dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use("/api/v1/chat",chatRoutes)
app.listen(process.env.PORT,()=>{
    console.log(`Chat service is running on port ${process.env.PORT}`);
})