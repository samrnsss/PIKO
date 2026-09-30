import { useContext } from "react";
import DataContext from "../context/DataContext";

function ImportantDeadlines() {

    const { tasks, goals } = useContext(DataContext);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function getDateOnly(dateString) {
        const date = new Date(dateString + "T00:00:00");
        date.setHours(0, 0, 0, 0);
        return date;
    }

    function getDaysDifference(dateString) {
        const dueDate = getDateOnly(dateString);

        return Math.ceil(
            (dueDate - today) / (1000 * 60 * 60 * 24)
        );
    }

    const taskDeadlines = tasks
        .filter((task) => task.dueDate && !task.completed)
        .map((task) => ({
            id: `task-${task.id}`,
            title: task.text,
            type: "Task",
            dueDate: task.dueDate,
            priority: task.priority
        }));

    const goalDeadlines = goals
        .filter((goal) => goal.dueDate && !goal.completed)
        .map((goal) => ({
            id: `goal-${goal.id}`,
            title: goal.text,
            type: "Goal",
            dueDate: goal.dueDate,
            priority: null
        }));

    const deadlines = [
        ...taskDeadlines,
        ...goalDeadlines
    ]
        .map((item) => ({
            ...item,
            daysLeft: getDaysDifference(item.dueDate)
        }))
        .filter((item) => item.daysLeft <= 7)
        .sort((a, b) => a.daysLeft - b.daysLeft)
        .slice(0, 6);

    function getDeadlineText(daysLeft) {

        if (daysLeft < 0) {
            return `${Math.abs(daysLeft)} day${
                Math.abs(daysLeft) === 1 ? "" : "s"
            } overdue`;
        }

        if (daysLeft === 0) {
            return "Due today";
        }

        if (daysLeft === 1) {
            return "Due tomorrow";
        }

        return `${daysLeft} days left`;
    }

    return (
        <div className="deadlines-card">

            <div className="deadlines-header">

                <div>
                    <h2>Important Deadlines</h2>

                    <p>
                        Tasks and goals that need your attention.
                    </p>
                </div>

            </div>

            {deadlines.length === 0 ? (

                <p className="empty-message">
                    No important deadlines coming up. 🌱
                </p>

            ) : (

                <div className="deadline-list">

                    {deadlines.map((item) => (

                        <div
                            className="deadline-item"
                            key={item.id}
                        >

                            <div className="deadline-info">

                                <span className="deadline-type">
                                    {item.type}
                                </span>

                                <h3>
                                    {item.title}
                                </h3>

                                <span className="deadline-date">
                                    {new Date(
                                        item.dueDate + "T00:00:00"
                                    ).toLocaleDateString()}
                                </span>

                            </div>

                            <div className="deadline-right">

                                {item.priority && (
                                    <span
                                        className={`task-priority ${item.priority.toLowerCase()}`}
                                    >
                                        {item.priority}
                                    </span>
                                )}

                                <span
                                    className={
                                        item.daysLeft < 0
                                            ? "deadline-overdue"
                                            : item.daysLeft === 0
                                            ? "deadline-today"
                                            : "deadline-upcoming"
                                    }
                                >
                                    {getDeadlineText(item.daysLeft)}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default ImportantDeadlines;