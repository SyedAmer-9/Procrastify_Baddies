

export default function TaskItem({task,deleteTask,toggleComplete}) {
  return (
    <li className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
        
        <input
            type='checkbox'
            
            checked = {task.completed}
            className = 'mr-w h-5 w-5'
            onChange={()=>toggleComplete(task._id)}
        />

        <span className={task.completed ? 'line-through text-gray-500':''}>
            {task.text}
        </span>

        <button 
            className="px-2 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
            onClick={()=>deleteTask(task._id)}
        >Delete</button>
    </li>
  )
}

