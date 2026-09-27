import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {

    // TASKS
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function addTask(task) {
        const newTask = {
            id: Date.now(),
            text: task.text,
            priority: task.priority,
            dueDate: task.dueDate,
            completed: false
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    function updateTask(id, updatedTask) {
    setTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id === id
                ? {
                    ...task,
                    text: updatedTask.text,
                    priority: updatedTask.priority,
                    dueDate: updatedTask.dueDate
                }
                : task
        )
    );
}

    function toggleTask(id) {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    }

    function deleteTask(id) {
        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== id)
        );
    }


    // GOALS
    const [goals, setGoals] = useState(() => {
        const savedGoals = localStorage.getItem("goals");
        return savedGoals ? JSON.parse(savedGoals) : [];
    });

    useEffect(() => {
        localStorage.setItem("goals", JSON.stringify(goals));
    }, [goals]);

    function addGoal(goal) {
        const newGoal = {
            id: Date.now(),
            text: goal,
            completed: false
        };

        setGoals((prevGoals) => [...prevGoals, newGoal]);
    }

    function toggleGoal(id) {
        setGoals((prevGoals) =>
            prevGoals.map((goal) =>
                goal.id === id
                    ? { ...goal, completed: !goal.completed }
                    : goal
            )
        );
    }

    function deleteGoal(id) {
        setGoals((prevGoals) =>
            prevGoals.filter((goal) => goal.id !== id)
        );
    }

    // HABITS
    const [habits, setHabits] = useState(() => {
        const savedHabits = localStorage.getItem("habits");
        return savedHabits ? JSON.parse(savedHabits) : [];
    });

    useEffect(() => {
        localStorage.setItem("habits", JSON.stringify(habits));
    }, [habits]);

    function addHabit(habit) {
        const newHabit = {
            id: Date.now(),
            name: habit,
            completed: false
        };

        setHabits((prevHabits) => [...prevHabits, newHabit]);
    }

    function toggleHabit(id) {
        setHabits((prevHabits) =>
            prevHabits.map((habit) =>
                habit.id === id
                    ? { ...habit, completed: !habit.completed }
                    : habit
            )
        );
    }

    function deleteHabit(id) {
        setHabits((prevHabits) =>
            prevHabits.filter((habit) => habit.id !== id)
        );
    }

    // LEARNING
        const [topics, setTopics] = useState(() => {
            const savedTopics = localStorage.getItem("topics");
            return savedTopics ? JSON.parse(savedTopics) : [];
        });

        useEffect(() => {
            localStorage.setItem("topics", JSON.stringify(topics));
        }, [topics]);

        function addTopic(topic) {
            const newTopic = {
                id: Date.now(),
                name: topic,
                completed: false
            };

            setTopics((prevTopics) => [...prevTopics, newTopic]);
        }

        function toggleTopic(id) {
            setTopics((prevTopics) =>
                prevTopics.map((topic) =>
                    topic.id === id
                        ? { ...topic, completed: !topic.completed }
                        : topic
                )
            );
        }

        function deleteTopic(id) {
            setTopics((prevTopics) =>
                prevTopics.filter((topic) => topic.id !== id)
            );
        }

        // PROJECTS
        const [projects, setProjects] = useState(() => {
            const savedProjects = localStorage.getItem("projects");
            return savedProjects ? JSON.parse(savedProjects) : [];
        });

        useEffect(() => {
            localStorage.setItem("projects", JSON.stringify(projects));
        }, [projects]);

        function addProject(project) {
            const newProject = {
                id: Date.now(),
                name: project.name,
                description: project.description,
                status: project.status,
                completed: false
            };

            setProjects((prevProjects) => [...prevProjects, newProject]);
        }

        function deleteProject(id) {
            setProjects((prevProjects) =>
                prevProjects.filter((project) => project.id !== id)
            );
        }

        function updateProjectStatus(id, status) {
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === id
                        ? { ...project, status: status }
                        : project
                )
            );
        }

        function toggleProject(id) {
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === id
                        ? {
                            ...project,
                            completed: !project.completed
                        }
                        : project
                )
            );
        }

        // NOTES
        const [notes, setNotes] = useState(() => {
            const savedNotes = localStorage.getItem("notes");
            return savedNotes ? JSON.parse(savedNotes) : [];
        });

        useEffect(() => {
            localStorage.setItem("notes", JSON.stringify(notes));
        }, [notes]);

        function addNote(note) {
            const newNote = {
                id: Date.now(),
                title: note.title,
                content: note.content,
                createdAt: new Date().toISOString()
            };

            setNotes((prevNotes) => [
                ...prevNotes,
                newNote
            ]);
        }

        function updateNote(id, updatedNote) {
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === id
                        ? {
                            ...note,
                            title: updatedNote.title,
                            content: updatedNote.content,
                            updatedAt: new Date().toISOString()
                        }
                        : note
                )
            );
        }

        function deleteNote(id) {
            setNotes((prevNotes) =>
                prevNotes.filter((note) => note.id !== id)
            );
        }


    return (
        <DataContext.Provider
            value={{
                tasks,
                addTask,
                toggleTask,
                deleteTask,
                updateTask,

                goals,
                addGoal,
                toggleGoal,
                deleteGoal,

                habits,
                addHabit,
                toggleHabit,
                deleteHabit,

                topics,
                addTopic,
                toggleTopic,
                deleteTopic,

                projects,
                addProject,
                deleteProject,
                updateProjectStatus,
                toggleProject,

                notes,
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