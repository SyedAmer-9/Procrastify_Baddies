// 1. Unnecessary imports (Login, Register) are removed.
import { useState, useEffect, useMemo, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import QuoteDisplay from '../components/QuoteDisplay';
import { useNavigate } from "react-router-dom";
import { getTasks ,addTask,updateTask,deleteTask as deleteTaskAPI } from "../services/api";

function TodoPage() {
  // We still need useContext to get the toggleTheme function for the button
  const { toggleTheme } = useContext(ThemeContext);

  const {logout:logoutContext} = useAuth();
  const navigate = useNavigate();
  // --- All of your existing to-do list state and logic stays here ---
  // This part was already correct.
  const [newTask, setNewTask] = useState("");

  const [filter, setFilter] = useState('all');


  const [tasks,setTaskList] = useState([]);

  useEffect(()=>{
    const loadTasks = async () =>{
        try{
            const tasksFromServer = await getTasks();
            setTaskList(tasksFromServer);
        }catch(error){
            console.error('Failed to load tasks',error);
            
        }
    };
    loadTasks();
  },[]);
  const remainingTasksCount = useMemo(() => {
    return tasks.filter(t => !t.completed).length;
  }, [tasks]);

const handleLogout = ()=>{
    logoutContext();
    navigate('/login');
}
  const handleSubmitTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    try{
        const newlyCreatedTask = await addTask(newTask);
        setTaskList([newlyCreatedTask,...tasks]);
        setNewTask('');
    }catch(error){
        console.error("Failed to add task: ",error);    
    }
}
  

  const deleteTask = async (idToDelete) => {
    try{
        await deleteTaskAPI(idToDelete);
        setTaskList(tasks.filter(task => task._id !== idToDelete));

    }catch(error){
        console.error('Failed to delete task : ',error);
    }
        
  };

  const toggleComplete = async (idToToggle) => {
    try{
        const updatedTaskFromServer = await updateTask(idToToggle);
        setTaskList(tasks.map(task =>
            task._id === idToToggle ? updatedTaskFromServer:task
        ));
    }catch(error){
        console.error("Failed to update task: ",error);
    }
        
  };

  let filteredTasks = [];
  if (filter === 'active') {
    filteredTasks = tasks.filter(t => !t.completed);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(t => t.completed);
  } else {
    filteredTasks = tasks;
  }
  // --- End of to-do list logic ---

  // 2. The return statement is cleaned up to ONLY show the to-do list UI
  return (
    <main className="p-8 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Procrastify-Baddies
        </h1>
        <div className="flex items-center gap-2">
            <button 
            onClick={toggleTheme}
            className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-sm"
            >
            Toggle Theme
            </button>

            <button
                onClick = {handleLogout}
                className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
            >Logout</button>
        </div>
      </div>
      
      <TaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmitTask={handleSubmitTask}
      />

      <h2 className="text-center text-gray-400 text-lg my-4">
        Tasks Remaining: {remainingTasksCount}
      </h2>

      <TaskFilter setFilter={setFilter} />

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />
      <QuoteDisplay />
    </main>
  );
}

export default TodoPage;