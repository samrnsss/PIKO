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


    // GOAL PROGRESS
    const goalProgress = getProgress(goals);


    // PROJECT STATUS
    const projectStatus = {

        notStarted: projects.filter(
            (project) => project.status === "Not Started"
        ).length,

        inProgress: projects.filter(
            (project) => project.status === "In Progress"
        ).length,

        completed: projects.filter(
            (project) => project.status === "Completed"
        ).length
    };

    const today = new Date().toISOString().split("T")[0];
    const overdueTasks = tasks.filter(
        (task) => 
            task.dueDate && task.dueDate < today && !task.completed
    ).length;
    
    const todayTasks = tasks.filter(
        (task) => 
            !task.completed && task.dueDate === today
    ).length;

    const upcomingTasks = tasks.filter(
        (task) => 
            task.dueDate && task.dueDate > today && !task.completed
    ).length;

    const highPriorityTasks = tasks.filter(
        (task) =>
            !task.completed && 
        task.priority === "High"
    ).length;

    // OTHER PROGRESS
    const taskProgress = getProgress(tasks);
    const habitProgress = getProgress(habits);
    const learningProgress = getProgress(topics);


    // OVERALL PROGRESS
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

            <div className="task-overview-card">

                <h2>Task Overview</h2>
                <div className="task-overview">
                    <div>
                        <strong> {overdueTasks}</strong>
                        <span> Overdue </span>
                    </div>

                <div>
                    <strong> {todayTasks}</strong>
                    <span> Due Today </span>
                </div>
                <div>
                    <strong> {upcomingTasks}</strong>
                    <span> Upcoming </span>
                </div>
                <div>
                    <strong> {highPriorityTasks}</strong>
                    <span> High Priority </span>
                </div>
            </div>
                </div>
                


            {/* GOALS + PROJECTS */}

            <div className="dashboard-extra">

                <div className="goal-progress-card">

                    <h2>Goal Progress</h2>

                    <ProgressBar
                        label="Goals"
                        progress={goalProgress}
                    />

                </div>


                <div className="project-status-card">

                    <h2>Project Status</h2>

                    <div className="project-status">
                        <span>Not Started</span>
                        <strong>
                            {projectStatus.notStarted}
                        </strong>
                    </div>

                    <div className="project-status">
                        <span>In Progress</span>
                        <strong>
                            {projectStatus.inProgress}
                        </strong>
                    </div>

                    <div className="project-status">
                        <span>Completed</span>
                        <strong>
                            {projectStatus.completed}
                        </strong>
                    </div>

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

                    tasks
                        .slice(-5)
                        .reverse()
                        .map((task) => (

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

                {tasks.filter(
                    (task) => !task.completed
                ).length === 0 ? (

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

                                <span>
                                    {task.text}
                                </span>

                            </div>

                        ))

                )}

            </div>

        </section>
    );
}


export default Dashboard;