import { useState, useContext } from "react";
import DataContext from "../context/DataContext";

function Tasks() {

    const { tasks, addTask, toggleTask, deleteTask } = useContext(DataContext);

    const [task, setTask] = useState("");

    function handleAddTask() {
        if (task.trim() === "") return;

        addTask(task);
        setTask("");
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

                <button onClick={handleAddTask}>
                    Add Task
                </button>

            </div>

            <div className="task-list">

                {tasks.map((task) => (

                    <div className="task-item" key={task.id}>

                        <div className="task-left">

                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                            />

                            <span
                                className={task.completed ? "completed" : ""}
                            >
                                {task.text}
                            </span>

                        </div>

                        <button
                            className="delete-btn"
                            onClick={() => deleteTask(task.id)}
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Tasks;