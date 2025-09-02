import {useRef, useEffect} from 'react';

function TaskForm({newTask,setNewTask,handleSubmitTask}){
    const inputRef = useRef(null);

    useEffect(()=>{
        inputRef.current.focus();
    },[]);
    return(
    <form onSubmit={handleSubmitTask} className="mb-3">
        <div className="flex gap-3 ">
            <input
                ref = {inputRef}
                className="flex-grow p-2.5 border-green-900 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                type='text'
                placeholder="Add your tasks here(as if you gonna complete it)"
                value = {newTask}
                onChange={(e)=>setNewTask(e.target.value)}
            ></input>

            <button 
                className=" bg-green-600 text-white px-3 py-2 rounded-md"
                type= 'submit'>
                Add Task
            </button>
        </div>
    </form>
    )
}
export default TaskForm;