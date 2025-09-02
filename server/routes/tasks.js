import express from 'express';
import auth from '../middleware/auth.js';
import Task from '../models/Task.js';


const router = express.Router();

router.get('/',auth,async (req,res)=>{
    try{
        const tasks = await Task.find({user:req.user.id}).sort({createdAt:-1});
        res.json(tasks);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
        
    }
})

router.post('/',auth,async (req,res)=>{
    try{
        const {text} = req.body;

        const newTask = new Task({
            text:text,
            user:req.user.id
        });

        const task = await newTask.save();

        res.status(201).json(task);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
})

router.put('/:id',auth,async (req,res)=>{
    try{
        let task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({message:'Task not Found'});

        }

        if(task.user.toString() !== req.user.id){
            return res.status(401).json({message:'Not Authorised'});
        }

        task.completed = !task.completed;
        await task.save();

        res.json(task)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/:id',auth,async (req,res)=>{
    try{
        let task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({message:'Task Not Found'});
        }
        if(task.user.toString() !== req.user.id){
            return res.status(401).json({message:'Not Authorised'});
        }

        await Task.findByIdAndDelete(req.params.id)

        res.json({message : "Task Removed"});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;