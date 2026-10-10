import { useState, useContext, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import DataContext from "../context/DataContext";

function Goals() {

    const {
        goals,
        addGoal,
        updateGoal,
        toggleGoal,
        deleteGoal,
        recordActivity
    } = useContext(DataContext);

    const [searchParams] = useSearchParams();
const selectedGoalId = searchParams.get("id");

useEffect(() => {

    if (!selectedGoalId) return;

    const element = document.getElementById(
        `goal-${selectedGoalId}`
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

}, [selectedGoalId]);

    const [goal, setGoal] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [editingGoalId, setEditingGoalId] = useState(null);

    function handleAddGoal() {
        if (goal.trim() === "") {
            return;
        }

        addGoal({
            text: goal,
            dueDate
        });

        setGoal("");
        setDueDate("");
    }

    function handleEditGoal(goal) {
        setGoal(goal.text);
        setDueDate(goal.dueDate || "");
        setEditingGoalId(goal.id);
    }

    function handleUpdateGoal() {
        if (goal.trim() === "") {
            return;
        }

        updateGoal(editingGoalId, {
            text: goal,
            dueDate
        });

        setGoal("");
        setDueDate("");
        setEditingGoalId(null);
    }

    function handleCancelEdit() {
        setGoal("");
        setDueDate("");
        setEditingGoalId(null);
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

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAddGoal();
                        }
                    }}
                />

                {editingGoalId === null ? (
                    <button onClick={handleAddGoal}>
                        Add Goal
                    </button>
                ) : (
                    <>
                        <button onClick={handleUpdateGoal}>
                            Update Goal
                        </button>

                        <button
                            className="cancel-btn"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </button>
                    </>
                )}

            </div>

            <div className="goal-list">

                {goals.map((goal) => (

                    <div className="goal-item" 
                    id={`goal-${goal.id}`}
                    key={goal.id}>

                        <div className="goal-left">

                            <input
                                type="checkbox"
                                checked={goal.completed}
                                onChange={() => {toggleGoal(goal.id);

                                    if(!goal.completed){
                                        recordActivity();
                                    }
                            }}
                            />

                            <span
                                className={
                                    goal.completed ? "completed" : ""
                                }
                            >
                                {goal.text}
                            </span>
                                {goal.dueDate && (
                                    <span className="goal-due-date">
                                        Due: {new Date(
                                            goal.dueDate + "T00:00:00"
                                        ).toLocaleDateString()}
                                    </span>
                                )}
                        </div>
                        <div className="goal-actions">
                            <button
                                className="edit-btn"
                                onClick={() => handleEditGoal(goal)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => deleteGoal(goal.id)}
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

export default Goals;