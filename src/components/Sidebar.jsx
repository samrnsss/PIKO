import { NavLink } from "react-router-dom";

function Sidebar({ setSearchOpen, setSearchTerm }) {

    const menuItems = [
        { name: "Dashboard", path: "/" },
        { name: "Tasks", path: "/tasks" },
        { name: "Goals", path: "/goals" },
        { name: "Habits", path: "/habits" },
        { name: "Learning", path: "/learning" },
        { name: "Projects", path: "/projects" },
        { name: "Notes", path: "/notes" }
    ];

    return (
        <aside className="sidebar">

            <h2 className="logo">PIKO</h2>

            <nav>
                {menuItems.map((item) => (
                    <NavLink
                        to={item.path}

                        onClick={() => {
                            setSearchOpen(false);
                            setSearchTerm("");
                        }}

                        className={({ isActive }) =>
                            isActive
                                ? "nav-item active"
                                : "nav-item"
                        }

                        key={item.path}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>

        </aside>
    );
}

export default Sidebar;