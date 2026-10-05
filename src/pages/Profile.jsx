import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Profile() {
    const { user, updateProfile, logout } = useAuth();
    const navigate = useNavigate();

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    function handleSave(e) {
        e.preventDefault();

        const result = updateProfile(name.trim(), email.trim());

        if (!result.success) {
            setError(result.message);
            setMessage("");
            return;
        }

        setError("");
        setMessage("Profile updated successfully.");
        setEditing(false);
    }

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-large-avatar">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

                <h1>{user?.name}</h1>
                <p className="profile-email">{user?.email}</p>

                {!editing ? (
                    <>
                        <div className="profile-details">
                            <div>
                                <span>Name</span>
                                <strong>{user?.name}</strong>
                            </div>

                            <div>
                                <span>Email</span>
                                <strong>{user?.email}</strong>
                            </div>
                        </div>

                        {message && (
                            <p className="profile-success">
                                {message}
                            </p>
                        )}

                        <button
                            className="profile-edit-btn"
                            onClick={() => {
                                setName(user?.name || "");
                                setEmail(user?.email || "");
                                setError("");
                                setEditing(true);
                            }}
                        >
                            Edit Profile
                        </button>

                        <button
                            className="profile-logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <form
                        className="profile-form"
                        onSubmit={handleSave}
                    >
                        <label>Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {error && (
                            <p className="profile-error">
                                {error}
                            </p>
                        )}

                        <div className="profile-edit-actions">
                            <button type="submit">
                                Save Changes
                            </button>

                            <button
                                type="button"
                                className="profile-cancel-btn"
                                onClick={() => {
                                    setEditing(false);
                                    setError("");
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

            </div>

        </div>
    );
}

export default Profile;