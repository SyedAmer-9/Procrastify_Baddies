import mongoose, { mongo } from "mongoose";

const TaskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
        
    }
},{timestamps:true});

const Task = mongoose.model('Task',TaskSchema);

export default Task;
