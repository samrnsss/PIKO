import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar({ searchOpen, setSearchOpen }) {

    const navigate = useNavigate();
    const {user, logout} = useAuth();

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


    function handleLogout() {
        logout();
        setSearchOpen(false);
        navigate("/login");
    }


    return (
        <header className="navbar">

            <div>
                {!searchOpen && (
                    <>
                        <h1>Good evening, {user?.name || "User"}</h1>
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
                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </header>
    );
}

export default Navbar;