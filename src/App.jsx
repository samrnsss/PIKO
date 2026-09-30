import { useState, useContext } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { DataProvider } from "./context/DataContext";
import DataContext from "./context/DataContext";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

import Tasks from "./pages/Tasks";
import Project from "./pages/Project";
import Goals from "./pages/Goals";
import Habits from "./pages/Habits";
import Learning from "./pages/Learning";
import Notes from "./pages/Notes";


function AppContent() {

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    const {
        tasks,
        goals,
        habits,
        topics,
        projects,
        notes
    } = useContext(DataContext);


    const search = searchTerm.toLowerCase().trim();

    const searchResults = [];


    // ================= SEARCH =================

    if (search !== "") {

        // TASKS
        tasks.forEach((task) => {

            if (
                task.text &&
                task.text.toLowerCase().includes(search)
            ) {

                searchResults.push({
                    type: "Task",
                    title: task.text
                });

            }

        });


        // GOALS
        goals.forEach((goal) => {

            if (
                goal.text &&
                goal.text.toLowerCase().includes(search)
            ) {

                searchResults.push({
                    type: "Goal",
                    title: goal.text
                });

            }

        });


        // HABITS
        habits.forEach((habit) => {

            if (
                habit.name &&
                habit.name.toLowerCase().includes(search)
            ) {

                searchResults.push({
                    type: "Habit",
                    title: habit.name
                });

            }

        });


        // LEARNING
        topics.forEach((topic) => {

            if (
                topic.name &&
                topic.name.toLowerCase().includes(search)
            ) {

                searchResults.push({
                    type: "Learning",
                    title: topic.name
                });

            }

        });


        // PROJECTS
        projects.forEach((project) => {

            if (
                (
                    project.name &&
                    project.name.toLowerCase().includes(search)
                ) ||
                (
                    project.description &&
                    project.description.toLowerCase().includes(search)
                )
            ) {

                searchResults.push({
                    type: "Project",
                    title: project.name
                });

            }

        });


        // NOTES
        notes.forEach((note) => {

            if (
                (
                    note.title &&
                    note.title.toLowerCase().includes(search)
                ) ||
                (
                    note.content &&
                    note.content.toLowerCase().includes(search)
                )
            ) {

                searchResults.push({
                    type: "Note",
                    title: note.title
                });

            }

        });

    }


    return (

        <div className="app">

            {/* SIDEBAR */}

            <Sidebar
                setSearchOpen={setSearchOpen}
                setSearchTerm={setSearchTerm}
            />


            <main className="main">

                {/* NAVBAR */}

                <Navbar
                    searchOpen={searchOpen}

                    setSearchOpen={(value) => {

                        setSearchOpen(value);

                        if (!value) {
                            setSearchTerm("");
                        }

                    }}
                />


                {/* ================= SEARCH VIEW ================= */}

                {searchOpen ? (

                    <div className="search-view">

                        <h1>Search PIKO</h1>


                        <input
                            type="text"
                            placeholder="Search anything..."
                            autoFocus
                            className="global-search-input"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />


                        {/* SEARCH RESULTS */}

                        {search !== "" &&
                            searchResults.length > 0 && (

                                <div className="search-results">

                                    {searchResults.map(
                                        (result, index) => (

                                            <div
                                                className="search-result"
                                                key={index}
                                            >

                                                <span className="search-type">
                                                    {result.type}
                                                </span>

                                                <h3>
                                                    {result.title}
                                                </h3>

                                            </div>

                                        )
                                    )}

                                </div>

                            )
                        }


                        {/* NO RESULTS */}

                        {search !== "" &&
                            searchResults.length === 0 && (

                                <p className="empty-message">
                                    No results found.
                                </p>

                            )
                        }

                    </div>

                ) : (

                    /* ================= NORMAL PAGES ================= */

                    <Routes>

                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/tasks"
                            element={<Tasks />}
                        />

                        <Route
                            path="/goals"
                            element={<Goals />}
                        />

                        <Route
                            path="/habits"
                            element={<Habits />}
                        />

                        <Route
                            path="/learning"
                            element={<Learning />}
                        />

                        <Route
                            path="/projects"
                            element={<Project />}
                        />

                        <Route
                            path="/notes"
                            element={<Notes />}
                        />

                    </Routes>

                )}

            </main>

        </div>

    );

}


function App() {

    return (

        <DataProvider>

            <BrowserRouter>

                <AppContent />

            </BrowserRouter>

        </DataProvider>

    );

}


export default App;