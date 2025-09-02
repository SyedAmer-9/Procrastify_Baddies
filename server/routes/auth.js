import express from 'express'
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register',async (req,res)=>{
    const {username,email,password} = req.body;

    try{
        let user = await User.findOne({$or:[{email},{username}]});

        if(user){
            return res.status(400).json({message:"Username or Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        user = new User({
            username,
            email,
            password:hashedPassword
        });

        await user.save();

        res.status(201).json({message:'User Registered Successfully'});
    }catch(error){
        console.log(error);
        res.status(500).send('Server Error');
        
    }
    
});

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid Credentials'});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:'Invalid Credentials'});
        }

        const payload = {
            user:{
                id:user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:'1h'},
            (err,token) =>{
                if(err) throw err;
                res.json({token})
            }
        )


    }catch(error){
        console.log(error);
        res.status(500).send('Server Error');
    }
});
export default router;