import { useContext } from "react";
import DataContext from "../context/DataContext";
import Card from "./Card";
import ProgressBar from "./ProgressBar";

function Dashboard() {

    const {
        tasks,
        goals,
        habits,
        topics,
        projects
    } = useContext(DataContext);


    // TASKS
    const remainingTasks = tasks.filter(
        (task) => !task.completed
    ).length;


    // GOALS
    const activeGoals = goals.filter(
        (goal) => !goal.completed
    ).length;


    // HABITS
    const completedHabits = habits.filter(
        (habit) => habit.completed
    ).length;


    // LEARNING
    const completedTopics = topics.filter(
        (topic) => topic.completed
    ).length;


    // PROGRESS FUNCTION
    function getProgress(items) {

        if (items.length === 0) {
            return 0;
        }

        const completed = items.filter(
            (item) => item.completed
        ).length;

        return Math.round(
            (completed / items.length) * 100
        );
    }


    const taskProgress = getProgress(tasks);
    const habitProgress = getProgress(habits);
    const learningProgress = getProgress(topics);


    const overallProgress = Math.round(
        (taskProgress + habitProgress + learningProgress) / 3
    );


    return (

        <section className="dashboard">

            {/* SUMMARY CARDS */}

            <Card
                title="Tasks"
                value={remainingTasks}
                description="Tasks remaining"
            />

            <Card
                title="Goals"
                value={activeGoals}
                description="Active goals"
            />

            <Card
                title="Habits"
                value={completedHabits}
                description="Completed habits"
            />

            <Card
                title="Learning"
                value={completedTopics}
                description="Topics completed"
            />

            <Card
                title="Projects"
                value={projects.length}
                description="Projects you're building"
            />


            {/* PROGRESS */}

            <div className="progress-card">

                <h2>Your Progress</h2>

                <ProgressBar
                    label="Tasks"
                    progress={taskProgress}
                />

                <ProgressBar
                    label="Habits"
                    progress={habitProgress}
                />

                <ProgressBar
                    label="Learning"
                    progress={learningProgress}
                />

                <div className="overall-progress">

                    <strong>
                        Overall Progress
                    </strong>

                    <span>
                        {overallProgress}%
                    </span>

                </div>

            </div>


            {/* RECENT TASKS */}

            <div className="recent-tasks">

                <h2>Recent Tasks</h2>

                {tasks.length === 0 ? (

                    <p className="empty-message">
                        No tasks yet. Add your first task! 🚀
                    </p>

                ) : (

                    tasks.slice(-5).reverse().map((task) => (

                        <div
                            className="recent-task"
                            key={task.id}
                        >

                            <span
                                className={
                                    task.completed
                                        ? "completed"
                                        : ""
                                }
                            >
                                {task.text}
                            </span>

                            <span>
                                {task.completed
                                    ? "✓"
                                    : "○"}
                            </span>

                        </div>

                    ))

                )}
                </div>
                {/* TODAY'S FOCUS */}

                <div className="todays-focus">

                    <h2>Today's Focus</h2>

                    {tasks.filter((task) => !task.completed).length === 0 ? (

                        <p className="empty-message">
                            Nothing urgent today. Enjoy your day! 🌱
                        </p>

                    ) : (

                        tasks
                            .filter((task) => !task.completed)
                            .slice(0, 3)
                            .map((task) => (

                                <div
                                    className="focus-item"
                                    key={task.id}
                                >

                                    <span>○</span>

                                    <span>{task.text}</span>

                                </div>

                            ))

                    )}

                </div>
            
        </section>
    );
}

export default Dashboard;