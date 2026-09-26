import { useState, useContext } from "react";
import DataContext from "../context/DataContext";

function Habits() {

    const {habits, addHabit, toggleHabit, deleteHabit} = useContext(DataContext);

    const [habit, setHabit] = useState("");

    function handleAddHabit() {
        if (habit.trim() === "") return;

        addHabit(habit);
        setHabit("");
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
                            handleAddHabit();
                        }
                    }}
                    />
                    <button onClick={handleAddHabit}>
                        Add Habit
                    </button>
                </div>

        <div className="habit-list">
            {habits.map((habit) => (

        <div className="habit-item" key={habit.id}>

            <div className="habit-left">

                <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => toggleHabit(habit.id)}
                />

                <span className={habit.completed ? "completed" : ""}>
                    {habit.name}
                </span>

            </div>

            <button
                className="delete-btn"
                onClick={() => deleteHabit(habit.id)}
            >
                Delete
            </button>

        </div>

    ))}
</div>
</div>
    );
}
export default Habits;