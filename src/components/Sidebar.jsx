import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Mascot } from "page-mascot";

function Sidebar({ setSearchOpen, setSearchTerm }) {
    const { user } = useAuth();

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

            <div className="logo-row">
                <h2 className="logo">PIKO</h2>

                <div className="sidebar-mascot">
                    <Mascot
                        directions="/mascots/koala-directions.webp"
                        reactions="/mascots/koala-reactions.webp"
                        size={50}
                        label= "PIKO Mascot"
                    />
                </div>
            </div>

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

            {user && (
                <Link
                    to="/profile"
                    className="profile-section"
                    onClick={() => {
                        setSearchOpen(false);
                        setSearchTerm("");
                    }}
                >
                    <div className="profile-avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="profile-info">
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                    </div>
                </Link>
)}

        </aside>
    );
}

export default Sidebar;