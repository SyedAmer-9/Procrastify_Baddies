import TaskItem from "./TaskItem";
function TaskList({tasks,deleteTask,toggleComplete}){
    return(
        <div>
            <ul className="space-y-2">
                {tasks.map(task=>(
                    <TaskItem key={task.id} 
                        task={task} 
                        deleteTask={deleteTask}
                        toggleComplete={toggleComplete}
                    />
                    ))}
            </ul>
        </div>
    )
}
export default TaskList;