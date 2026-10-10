import { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DataContext from "../context/DataContext";

function Tasks() {

    const [searchParams] = useSearchParams();
    const selectedTaskId = searchParams.get("id");

    useEffect(() => {

    if (!selectedTaskId) return;

    const element = document.getElementById(
        `task-${selectedTaskId}`
    );

    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        element.classList.add("search-highlight");

        setTimeout(() => {
            element.classList.remove("search-highlight");
        }, 2000);
    }

}, [selectedTaskId]);

    const { tasks, addTask,updateTask, toggleTask, deleteTask, recordActivity} = useContext(DataContext);

    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("Medium");
    const[filter, setFilter] = useState("All");
    const [dueDate, setDueDate] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);

    function handleAddTask() {
        if (task.trim() === "") {
            return;
        }
        
        addTask({ text: task, priority, dueDate });
        setTask("");
        setPriority("Medium");
        setDueDate("");
    }

    const filteredTasks = tasks.filter((task) =>{
        if (filter === "Pending") {
            return !task.completed;
        }

        if(filter === "Completed"){
            return task.completed;
        }

        if(filter == "High"){
            return task.priority === "High";
        }

        if (filter === "Medium"){
            return task.priority === "Medium";
        }

        if(filter === "Low"){
            return task.priority === "Low";
        }
        return true;
    })

    const today = new Date().toISOString().split("T")[0];

    const getDueStatus = (task) =>{
        if(!task.dueDate || task.completed){
            return "";
        }

        if(task.dueDate < today){
            return "Overdue";
        }

        if(task.dueDate === today){
            return "Due Today";
        }
        return "";
    };

        function handleEditTask(task) {
        setTask(task.text);
        setPriority(task.priority || "Medium");
        setDueDate(task.dueDate || "");
        setEditingTaskId(task.id);
    }

    function handleUpdateTask() {
        if (task.trim() === "") {
            return;
        }

        updateTask(editingTaskId, {
            text: task,
            priority,
            dueDate
        });

        setTask("");
        setPriority("Medium");
        setDueDate("");
        setEditingTaskId(null);
    }

    function handleCancelEdit() {
        setTask("");
        setPriority("Medium");
        setDueDate("");
        setEditingTaskId(null);
    }

    return (
        <div className="tasks-page">

            <h1>Tasks</h1>
            <p className="page-subtitle">
                Stay on top of what you need to do.
            </p>

            <div className="task-input">

                <input
                    type="text"
                    value={task}
                    placeholder="Add a new task..."
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAddTask();
                        }
                    }}
                />
                <input 
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                {editingTaskId === null ?(
                <button onClick={handleAddTask}>
                    Add Task
                </button>
                ) : (
                <>
                    <button onClick={handleUpdateTask}>
                        Update Task
                    </button>

                    <button 
                    className = "cancel-btn"
                    onClick={handleCancelEdit}
                    >
                        Cancel
                    </button>
                </>
                )}

            </div>

            <div className="task-filter">

                    {["All", "Pending", "Completed", "High", "Medium", "Low", "Overdue"].map(
                        (option) => (
                            <button
                                key={option}
                                className={
                                    filter === option
                                        ? "filter-btn active"
                                        : "filter-btn"
                                }
                                onClick={() => setFilter(option)}
                            >
                                {option}
                            </button>
                        )
                    )}
            </div>

            <div className="task-list">

                {filteredTasks.map((task) => (

                    <div className="task-item" 
                    id={`task-${task.id}`}
                    key={task.id}>

                        <div className="task-left">

                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => {
                                    toggleTask(task.id);
                                    
                                    if(!task.completed){
                                        recordActivity(`Completed task: "${task.text}"`);
                                    }
                                }}
                            />

                            <div className="task-info">

                            <span className={task.completed ? "completed" : ""}>
                                {task.text}
                            </span>

                            <span className={`task-priority ${task.priority?.toLowerCase()}`}>
                                {task.priority || "Medium"}
                            </span>

                            {task.dueDate && (
                                <span className="task-due-date">
                                    Due: {new Date(
                                        task.dueDate + "T00:00:00"
                                    ).toLocaleDateString()}
                                </span>
                            )}

                            {getDueStatus(task) && (
                                <span className="task-status">
                                    {getDueStatus(task)}
                                </span>
                            )}
                            

                            
                        </div>

                        </div>
                        
                        <div className = "task-actions">
                            <button
                                className="edit-btn"
                                onClick={() => handleEditTask(task)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Tasks;