import { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DataContext from "../context/DataContext";

function Habits() {

    const {
        habits,
        addHabit,
        updateHabit,
        toggleHabit,
        deleteHabit,
        recordActivity
    } = useContext(DataContext);

    const [habit, setHabit] = useState("");
    const [editingHabitId, setEditingHabitId] = useState(null);

    const [searchParams] = useSearchParams();
const selectedHabitId = searchParams.get("id");

useEffect(() => {

    if (!selectedHabitId) return;

    const element = document.getElementById(
        `habit-${selectedHabitId}`
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

}, [selectedHabitId]);

    function handleAddHabit() {
        if (habit.trim() === "") {
            return;
        }

        addHabit(habit);
        setHabit("");
    }

    function handleEditHabit(habit) {
        setHabit(habit.name);
        setEditingHabitId(habit.id);
    }

    function handleUpdateHabit() {
        if (habit.trim() === "") {
            return;
        }

        updateHabit(editingHabitId, {
            name: habit
        });

        setHabit("");
        setEditingHabitId(null);
    }

    function handleCancelEdit() {
        setHabit("");
        setEditingHabitId(null);
    }

    return (
        <div className="habit-page">

            <h1>Habits</h1>

            <div className="habit-input">

                <input
                    type="text"
                    value={habit}
                    placeholder="Add a new habit..."
                    onChange={(e) => setHabit(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (editingHabitId !== null) {
                                handleUpdateHabit();
                            } else {
                                handleAddHabit();
                            }
                        }
                    }}
                />

                {editingHabitId === null ? (
                    <button onClick={handleAddHabit}>
                        Add Habit
                    </button>
                ) : (
                    <>
                        <button onClick={handleUpdateHabit}>
                            Update Habit
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
            <div className="habit-list">
                {habits.map((habit) => (
                    <div className="habit-item" 
                    id={`habit-${habit.id}`}
                    key={habit.id}>
                        <div className="habit-left">
                            <input
                                type="checkbox"
                                checked={habit.completed}
                                onChange={() => {
                                    toggleHabit(habit.id);
                                    if (!habit.completed) {
                                        recordActivity();
                                    }
                                }}
                            />
                            <span
                                className={
                                    habit.completed
                                        ? "completed"
                                        : ""
                                }
                            >
                                {habit.name}
                            </span>
                        </div>
                        <div className="habit-actions">
                            <button
                                className="edit-btn"
                                onClick={() => handleEditHabit(habit)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => deleteHabit(habit.id)}
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

export default Habits;