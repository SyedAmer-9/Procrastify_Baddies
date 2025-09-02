import express from 'express'
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

dotenv.config() // loads environment variable from .env


const app = express()
const PORT = process.env.PORT || 5001 ;
const mongoURI = process.env.MONGO_URI;
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/tasks',taskRoutes)

mongoose.connect(mongoURI)
    .then(()=>{
        console.log("Connected to Database successfuly");

        app.listen(PORT,()=>{
            console.log(`Server is running on the ${PORT}`);    
        });    
    })
    .catch(err =>{
        console.log("Database error",err);
        
    });


app.get('/',(req,res)=>{
    res.send("Hello this is the deployment of the server");
});
