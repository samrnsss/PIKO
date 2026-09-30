import { useEffect, useState } from "react";

function Navbar({ searchOpen, setSearchOpen }) {

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkMode ? "dark" : "light"
        );

        localStorage.setItem(
            "theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    return (
        <header className="navbar">

            <div>
                {!searchOpen && (
                    <>
                        <h1>Good evening, Aashna</h1>
                        <p>Here's your overview for today.</p>
                    </>
                )}
            </div>

            <div className="navbar-actions">

                <button
                    className="search-button"
                    onClick={() => setSearchOpen(!searchOpen)}
                    aria-label="Search"
                >
                    🔍
                </button>

                <button
                    className="theme-toggle"
                    onClick={() => setDarkMode(!darkMode)}
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? "☀️" : "🌙"}
                </button>

            </div>

        </header>
    );
}

export default Navbar;