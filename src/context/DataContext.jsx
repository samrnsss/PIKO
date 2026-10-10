import { createContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const API_URL = "http://localhost:5000/api";

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

    const dataForLocalStorage = {
    ...data,
    tasks: [],
    goals: [],
    habits: [],
    topics: [],
};

localStorage.setItem(
    key,
    JSON.stringify(dataForLocalStorage)
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

// Load tasks from MongoDB
useEffect(() => {
    if (!user?.id) {
        return;
    }

    async function loadTasks() {
        try {
            const response = await fetch(
                `${API_URL}/tasks?userId=${user.id}`
            );

            const tasksFromDatabase = await response.json();

            if (!response.ok) {
                console.error("Failed to load tasks:", tasksFromDatabase);
                return;
            }

            const formattedTasks = tasksFromDatabase.map((task) => ({
                ...task,
                id: task._id
            }));

            setData((prev) => ({
                ...prev,
                tasks: formattedTasks
            }));
        } catch (error) {
            console.error("Load tasks error:", error);
        }
    }

    loadTasks();
}, [user?.id]);


// CREATE TASK
async function addTask(task) {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: task.text,
                priority: task.priority,
                dueDate: task.dueDate,
                userId: user.id
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Create task failed:", data);
            return;
        }

        const newTask = {
            ...data.task,
            id: data.task._id
        };

        setData((prev) => ({
            ...prev,
            tasks: [newTask, ...prev.tasks]
        }));
    } catch (error) {
        console.error("Create task error:", error);
    }
}


// UPDATE TASK
async function updateTask(id, updatedTask) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: updatedTask.text,
                priority: updatedTask.priority,
                dueDate: updatedTask.dueDate,
                userId: user.id
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Update task failed:", data);
            return;
        }

        const updated = {
            ...data.task,
            id: data.task._id
        };

        setData((prev) => ({
            ...prev,
            tasks: prev.tasks.map((task) =>
                task.id === id ? updated : task
            )
        }));
    } catch (error) {
        console.error("Update task error:", error);
    }
}


// TOGGLE TASK
async function toggleTask(id) {
    try {
        const response = await fetch(
            `${API_URL}/tasks/${id}/toggle`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.id
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Toggle task failed:", data);
            return;
        }

        const updated = {
            ...data.task,
            id: data.task._id
        };

        setData((prev) => ({
            ...prev,
            tasks: prev.tasks.map((task) =>
                task.id === id ? updated : task
            )
        }));
    } catch (error) {
        console.error("Toggle task error:", error);
    }
}


// DELETE TASK
async function deleteTask(id) {
    try {
        const response = await fetch(
            `${API_URL}/tasks/${id}?userId=${user.id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Delete task failed:", data);
            return;
        }

        setData((prev) => ({
            ...prev,
            tasks: prev.tasks.filter(
                (task) => task.id !== id
            )
        }));
    } catch (error) {
        console.error("Delete task error:", error);
    }
}

    // =========================
    // GOALS
    // =========================

    //load goals from MongoDB
    useEffect(() => {
        if (!user?.id) {
            return;
        }
        async function loadGoals() {
            try {
                const response = await fetch(
                    `${API_URL}/goals?userId=${user.id}`
                );
                const goalsFromDatabase = await response.json();

                if (!response.ok) {
                    console.error("Failed to load goals:", goalsFromDatabase);
                    return;
                }
                const formattedGoals = goalsFromDatabase.map((goal) => ({
                    ...goal,
                    id: goal._id
                }));

                setData((prev) => ({
                    ...prev,
                    goals: formattedGoals
                }));
            } catch (error) {
                console.error("Load goals error:", error);
            }
        }

        loadGoals();
    }, [user?.id]);

    // CREATE GOAL
    async function addGoal(goal) {
        try {
            const response = await fetch(
                `${API_URL}/goals`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        text: goal.text,
                        dueDate: goal.dueDate,
                        userId: user.id
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error("Add goal failed:", data);
                return;
            }

            const newGoal = {
                ...data.goal,
                id: data.goal._id
            };

            setData((prev) => ({
                ...prev,
                goals: [newGoal, ...prev.goals]
            }));
        } catch (error) {
            console.error("Add goal error:", error);
        }
    }

    // UPDATE GOAL
    async function updateGoal(id, updatedGoal) {
        try {
            const response = await fetch(
                `${API_URL}/goals/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        text: updatedGoal.text,
                        dueDate: updatedGoal.dueDate,
                        userId: user.id
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error("Update goal failed:", data);
                return;
            }

            const updated = {
                ...data.goal,
                id: data.goal._id
            };

            setData((prev) => ({
                ...prev,
                goals: prev.goals.map((goal) =>
                    goal.id === id ? updated : goal
                )
            }));
        } catch (error) {
            console.error("Update goal error:", error);
        }
    }

    //toggle goal

    async function toggleGoal(id) {
        try {
            const response = await fetch(
                `${API_URL}/goals/${id}/toggle`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.id
                })
            }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error("Toggle goal failed:", data);
                return;
            }

            const updated = {
                ...data.goal,
                id: data.goal._id
            };

            setData((prev) => ({
                ...prev,
                goals: prev.goals.map((goal) =>
                    goal.id === id ? updated : goal
                )
            }));
        } catch (error) {
            console.error("Toggle goal error:", error);
        }
    }

    //delete goal
    async function deleteGoal(id) {
        try {
            const response = await fetch(
                `${API_URL}/goals/${id}?userId=${user.id}`,
                {
                    method: "DELETE"
                }
            );
            const data = await response.json();

            if (!response.ok) {
                console.error("Delete goal failed:", data);
                return;
            }

            setData((prev) => ({
                ...prev,
                goals: prev.goals.filter(
                    (goal) => goal.id !== id
                )
            }));
        } catch (error) {
            console.error("Delete goal error:", error);
        }
    }

    // /loads topics from mongoDB
    useEffect(() => {
        if (!user?.id)
            return;
        
        async function loadTopics() {
            try {
                const response = await fetch(
                    `${API_URL}/topics?userId=${user.id}`
                );

                const topicsFromDatabase = await response.json();

                if (!response.ok) {
                    console.error("Failed to load topics:", topicsFromDatabase);
                    return;
                }

                const formattedTopics = topicsFromDatabase.map((topic) => ({
                    ...topic,
                    id: topic._id
                }));

                setData((prev) => ({
                    ...prev,
                    topics: formattedTopics
                }));
            } catch (error) {
                console.error("Load topics error:", error);
            }
        }
        loadTopics();
    }, [user?.id]);

    // HABITS

    //load habits from mongoDB
    useEffect(() => {
        if (!user?.id) {
            return;
        }
        async function loadHabits() {
            try {
                const response = await fetch(
                    `${API_URL}/habits?userId=${user.id}`
                );
                const habitsFromDatabase = await response.json();

                if (!response.ok) {
                    console.error("Failed to load habits:", habitsFromDatabase);
                    return;
                }
                const formattedHabits = habitsFromDatabase.map((habit) => ({
                    ...habit,
                    id: habit._id
                }));
                setData((prev) => ({
                    ...prev,
                    habits: formattedHabits
                }));
            } catch (error) {
                console.error("Load habits error:", error);
            }
        }
        loadHabits();
    }, [user?.id]);

    //create habit

    async function addHabit(habit) {
        try {
            const response = await fetch(`${API_URL}/habits`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: habit,
                    userId: user.id
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Create a habit failed:", data);
                return;
            }

            const newHabit = {
                ...data.habit,
                id: data.habit._id
            };

            setData((prev) => ({
                ...prev,
                habits: [...prev.habits, newHabit]
            }));
        } catch (error) {
            console.error("Create a habit error:", error);
        }
    }

    //update habit
    async function updateHabit(id, updatedHabit) {
        try {
            const response = await fetch(`${API_URL}/habits/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: updatedHabit.name,
                    userId: user.id
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Update habit failed:", data);
                return;
            }

            const updated = {
                ...data.habit,
                id: data.habit._id
            };

            setData((prev) => ({
                ...prev,
                habits: prev.habits.map((habit) =>
                    habit.id === id
                        ? updated
                        : habit
                )
            }));
        } catch (error) {
            console.error("Update habit error:", error);
        }
    }


    //toggle habit
    async function toggleHabit(id) {
        try {
            const response = await fetch(`${API_URL}/habits/${id}/toggle`, 
                {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.id
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Toggle habit failed:", data);
                return;
            }

            const updated = {
                ...data.habit,
                id: data.habit._id
            };

            setData((prev) => ({
                ...prev,
                habits: prev.habits.map((habit) =>
                    habit.id === id? updated : habit 
                )
            }));
        } catch (error) {
            console.error("Toggle habit error:", error);
        }
    }

    //delete habit
    async function deleteHabit(id) {
        try {
            const response = await fetch(
                `${API_URL}/habits/${id}?userId=${user.id}`, 
                {
                method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error("Delete habit failed:", data);
                return;
            }
            setData((prev) => ({
                ...prev,
                habits: prev.habits.filter(
                    (habit) => habit.id !== id
                )
            }));
        } catch (error) {
            console.error("Delete habit error:", error);
        }
    }

    // =========================
    // LEARNING
    // =========================

    async function addTopic(topic) {
        try {
            const response = await fetch(`${API_URL}/topics`, {
                method: "POST", 
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    name: typeof topic === "string" ? topic : topic.name,
                    userId: user.id
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Add topic failed:", data);
                return;
            }

            const newTopic = {
                ...data.topic,
                id: data.topic._id
            };

            setData((prev) => ({
                ...prev,
                topics: [...prev.topics, newTopic]
            }));
        } catch (error) {
            console.error("Add topic error:", error);
        }
    }

    async function updateTopic(id, updatedTopic) {
        try {
            const response = await fetch(`${API_URL}/topics/${id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    name: updatedTopic.name,
                    userId: user.id
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Update topic failed:", data);
                return;
            }

            const updated = {
                ...data.topic,
                id: data.topic._id
            };

            setData((prev) => ({
                ...prev,
                topics: prev.topics.map((topic) =>
                    topic.id === id
                        ? updated
                        : topic
                )
            }));
        } catch (error) {
            console.error("Update topic error:", error);
        }
    }

    async function toggleTopic(id) {
        try {
            const response = await fetch(`${API_URL}/topics/${id}/toggle`, {
                method: "PATCH",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    userId: user.id
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Toggle topic failed:", data);
                return;
            }

            const updated = {
                ...data.topic,
                id: data.topic._id
            };

            setData((prev) => ({
                ...prev,
                topics: prev.topics.map((topic) =>
                    topic.id === id
                        ? updated
                        : topic
                )
            }));
        } catch (error) {
            console.error("Toggle topic error:", error);
        }
    }

    async function deleteTopic(id) {
        try {
            const response = await fetch(
                `${API_URL}/topics/${id}?userId=${user.id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.error("Delete topic failed:", data);
                return;
            }

            setData((prev) => ({
                ...prev,
                topics: prev.topics.filter(
                    (topic) => topic.id !== id
                )
            }));
        } catch (error) {
            console.error("Delete topic error:", error);
        }
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