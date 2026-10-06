import { createContext, useState } from "react";

const AuthContext = createContext();

const API_URL = "http://localhost:5000/api/auth";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("pikoUser");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // SIGNUP
    async function signup(name, email, password) {
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: data.message || "Signup failed."
                };
            }

            localStorage.setItem(
                "pikoUser",
                JSON.stringify(data.user)
            );

            setUser(data.user);

            return {
                success: true
            };
        } catch (error) {
            console.error("Signup error:", error);

            return {
                success: false,
                message: "Unable to connect to the server."
            };
        }
    }

    // LOGIN
    async function login(email, password) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: data.message || "Login failed."
                };
            }

            localStorage.setItem(
                "pikoUser",
                JSON.stringify(data.user)
            );

            setUser(data.user);

            return {
                success: true
            };
        } catch (error) {
            console.error("Login error:", error);

            return {
                success: false,
                message: "Unable to connect to the server."
            };
        }
    }

    // PROFILE
    function updateProfile(name, email) {
        const updatedUser = {
            ...user,
            name,
            email
        };

        localStorage.setItem(
            "pikoUser",
            JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

        return {
            success: true
        };
    }

    // LOGOUT
    function logout() {
        localStorage.removeItem("pikoUser");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                login,
                updateProfile,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;