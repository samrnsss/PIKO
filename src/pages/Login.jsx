import "../auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const result = login(email, password);

        if (!result.success) {
            setError(result.message);
            return;
        }

        setError("");
        navigate("/");
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Welcome back to PIKO</h1>
                <p className="auth-subtitle">
                    Log in to continue to your personal workspace.
                </p>

                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit">Login</button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <Link to="/signup">Create one</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;