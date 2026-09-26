import { useState, useContext } from "react";
import DataContext from "../context/DataContext";

function Goals() {

    const {goals,addGoal,toggleGoal,deleteGoal} = useContext(DataContext);

    const [goal, setGoal] = useState("");

    function handleAddGoal() {
        if (goal.trim() === "") return;

        addGoal(goal);
        setGoal("");
    }

    return (
        <div className="goals-page">

            <h1>Goals</h1>

            <p className="page-subtitle">
                Turn your plans into something you can achieve.
            </p>

            <div className="goal-input">

                <input
                    type="text"
                    value={goal}
                    placeholder="Add a new goal..."
                    onChange={(e) => setGoal(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAddGoal();
                        }
                    }}
                />

                <button onClick={handleAddGoal}>
                    Add Goal
                </button>

            </div>

            <div className="goal-list">

                {goals.map((goal) => (

                    <div className="goal-item" key={goal.id}>

                        <div className="goal-left">

                            <input
                                type="checkbox"
                                checked={goal.completed}
                                onChange={() => toggleGoal(goal.id)}
                            />

                            <span
                                className={
                                    goal.completed ? "completed" : ""
                                }
                            >
                                {goal.text}
                            </span>

                        </div>

                        <button
                            className="delete-btn"
                            onClick={() => deleteGoal(goal.id)}
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Goals;