import { createContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const DataContext = createContext();

function getStorageKey(email) {
    return `piko_data_${encodeURIComponent(email.toLowerCase())}`;
}

const emptyData = {
    activity: {},
    tasks: [],
    goals: [],
    habits: [],
    topics: [],
    projects: [],
    notes: []
};

export function DataProvider({ children }) {
    const { user } = useAuth();

    function loadUserData(email) {
    if (!email) {
        return emptyData;
    }

    const key = getStorageKey(email);
    const savedData = localStorage.getItem(key);

    if (!savedData) {
        return emptyData;
    }

    try {
        return {
            ...emptyData,
            ...JSON.parse(savedData)
        };
    } catch {
        return emptyData;
    }
}

const [data, setData] = useState(() =>
    loadUserData(user?.email)
);

// =========================
// SAVE USER DATA
// =========================

useEffect(() => {
    if (!user?.email) {
        return;
    }

    const key = getStorageKey(user.email);

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );
}, [data, user?.email]);

    // =========================
    // ACTIVITY
    // =========================

    function recordActivity() {
        const today =
            new Date().toISOString().split("T")[0];

        setData((prev) => ({
            ...prev,
            activity: {
                ...prev.activity,
                [today]:
                    (prev.activity[today] || 0) + 1
            }
        }));
    }

    // =========================
    // TASKS
    // =========================

    function addTask(task) {
        const newTask = {
            id: Date.now(),
            text: task.text,
            priority: task.priority,
            dueDate: task.dueDate,
            completed: false
        };

        setData((prev) => ({
            ...prev,
            tasks: [...prev.tasks, newTask]
        }));
    }

    function updateTask(id, updatedTask) {
        setData((prev) => ({
            ...prev,
            tasks: prev.tasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        text: updatedTask.text,
                        priority: updatedTask.priority,
                        dueDate: updatedTask.dueDate
                    }
                    : task
            )
        }));
    }

    function toggleTask(id) {
        setData((prev) => ({
            ...prev,
            tasks: prev.tasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        completed: !task.completed
                    }
                    : task
            )
        }));
    }

    function deleteTask(id) {
        setData((prev) => ({
            ...prev,
            tasks: prev.tasks.filter(
                (task) => task.id !== id
            )
        }));
    }

    // =========================
    // GOALS
    // =========================

    function addGoal(goal) {
        const newGoal = {
            id: Date.now(),
            text: goal.text,
            dueDate: goal.dueDate,
            completed: false
        };

        setData((prev) => ({
            ...prev,
            goals: [...prev.goals, newGoal]
        }));
    }

    function updateGoal(id, updatedGoal) {
        setData((prev) => ({
            ...prev,
            goals: prev.goals.map((goal) =>
                goal.id === id
                    ? {
                        ...goal,
                        text: updatedGoal.text,
                        dueDate: updatedGoal.dueDate
                    }
                    : goal
            )
        }));
    }

    function toggleGoal(id) {
        setData((prev) => ({
            ...prev,
            goals: prev.goals.map((goal) =>
                goal.id === id
                    ? {
                        ...goal,
                        completed: !goal.completed
                    }
                    : goal
            )
        }));
    }

    function deleteGoal(id) {
        setData((prev) => ({
            ...prev,
            goals: prev.goals.filter(
                (goal) => goal.id !== id
            )
        }));
    }

    // =========================
    // HABITS
    // =========================

    function addHabit(habit) {
        const newHabit = {
            id: Date.now(),
            name: habit,
            completed: false
        };

        setData((prev) => ({
            ...prev,
            habits: [...prev.habits, newHabit]
        }));
    }

    function updateHabit(id, updatedHabit) {
        setData((prev) => ({
            ...prev,
            habits: prev.habits.map((habit) =>
                habit.id === id
                    ? {
                        ...habit,
                        name: updatedHabit.name
                    }
                    : habit
            )
        }));
    }

    function toggleHabit(id) {
        setData((prev) => ({
            ...prev,
            habits: prev.habits.map((habit) =>
                habit.id === id
                    ? {
                        ...habit,
                        completed: !habit.completed
                    }
                    : habit
            )
        }));
    }

    function deleteHabit(id) {
        setData((prev) => ({
            ...prev,
            habits: prev.habits.filter(
                (habit) => habit.id !== id
            )
        }));
    }

    // =========================
    // LEARNING
    // =========================

    function addTopic(topic) {
        const newTopic = {
            id: Date.now(),
            name: topic,
            completed: false
        };

        setData((prev) => ({
            ...prev,
            topics: [...prev.topics, newTopic]
        }));
    }

    function updateTopic(id, updatedTopic) {
        setData((prev) => ({
            ...prev,
            topics: prev.topics.map((topic) =>
                topic.id === id
                    ? {
                        ...topic,
                        name: updatedTopic.name
                    }
                    : topic
            )
        }));
    }

    function toggleTopic(id) {
        setData((prev) => ({
            ...prev,
            topics: prev.topics.map((topic) =>
                topic.id === id
                    ? {
                        ...topic,
                        completed: !topic.completed
                    }
                    : topic
            )
        }));
    }

    function deleteTopic(id) {
        setData((prev) => ({
            ...prev,
            topics: prev.topics.filter(
                (topic) => topic.id !== id
            )
        }));
    }

    // =========================
    // PROJECTS
    // =========================

    function addProject(project) {
        const newProject = {
            id: Date.now(),
            name: project.name,
            description: project.description,
            status: project.status,
            completed: false
        };

        setData((prev) => ({
            ...prev,
            projects: [...prev.projects, newProject]
        }));
    }

    function deleteProject(id) {
        setData((prev) => ({
            ...prev,
            projects: prev.projects.filter(
                (project) => project.id !== id
            )
        }));
    }

    function updateProjectStatus(id, status) {
        setData((prev) => ({
            ...prev,
            projects: prev.projects.map((project) =>
                project.id === id
                    ? {
                        ...project,
                        status
                    }
                    : project
            )
        }));
    }

    function toggleProject(id) {
        setData((prev) => ({
            ...prev,
            projects: prev.projects.map((project) =>
                project.id === id
                    ? {
                        ...project,
                        completed:
                            !project.completed
                    }
                    : project
            )
        }));
    }

    // =========================
    // NOTES
    // =========================

    function addNote(note) {
        const newNote = {
            id: Date.now(),
            title: note.title,
            content: note.content,
            createdAt: new Date().toISOString()
        };

        setData((prev) => ({
            ...prev,
            notes: [...prev.notes, newNote]
        }));
    }

    function updateNote(id, updatedNote) {
        setData((prev) => ({
            ...prev,
            notes: prev.notes.map((note) =>
                note.id === id
                    ? {
                        ...note,
                        title: updatedNote.title,
                        content: updatedNote.content,
                        updatedAt:
                            new Date().toISOString()
                    }
                    : note
            )
        }));
    }

    function deleteNote(id) {
        setData((prev) => ({
            ...prev,
            notes: prev.notes.filter(
                (note) => note.id !== id
            )
        }));
    }


    return (
        <DataContext.Provider
            value={{
                activity: data.activity,
                recordActivity,

                tasks: data.tasks,
                addTask,
                toggleTask,
                deleteTask,
                updateTask,

                goals: data.goals,
                addGoal,
                updateGoal,
                toggleGoal,
                deleteGoal,

                habits: data.habits,
                addHabit,
                updateHabit,
                toggleHabit,
                deleteHabit,

                topics: data.topics,
                addTopic,
                updateTopic,
                toggleTopic,
                deleteTopic,

                projects: data.projects,
                addProject,
                deleteProject,
                updateProjectStatus,
                toggleProject,

                notes: data.notes,
                addNote,
                updateNote,
                deleteNote
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;