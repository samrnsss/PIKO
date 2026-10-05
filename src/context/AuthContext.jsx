import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("pikoUser");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    function signup(name, email, password) {
        const users = JSON.parse(localStorage.getItem("pikoUsers")) || [];

        const existingUser = users.find(
            (item) => item.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
            return {
                success: false,
                message: "An account with this email already exists."
            };
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password
        };

        users.push(newUser);

        localStorage.setItem("pikoUsers", JSON.stringify(users));
        localStorage.setItem("pikoUser", JSON.stringify(newUser));

        setUser(newUser);

        return {
            success: true
        };
    }

    function login(email, password) {
        const users = JSON.parse(localStorage.getItem("pikoUsers")) || [];

        const foundUser = users.find(
            (item) =>
                item.email.toLowerCase() === email.toLowerCase() &&
                item.password === password
        );

        if (!foundUser) {
            return {
                success: false,
                message: "Invalid email or password."
            };
        }

        localStorage.setItem("pikoUser", JSON.stringify(foundUser));
        setUser(foundUser);

        return {
            success: true
        };
    }

    function updateProfile(name, email) {
    const users = JSON.parse(localStorage.getItem("pikoUsers")) || [];

    const emailExists = users.find(
        (item) =>
            item.email.toLowerCase() === email.toLowerCase() &&
            item.id !== user.id
    );

    if (emailExists) {
        return {
            success: false,
            message: "Another account is already using this email."
        };
    }

    const updatedUser = {
        ...user,
        name,
        email
    };

    const updatedUsers = users.map((item) =>
        item.id === user.id ? updatedUser : item
    );

    localStorage.setItem("pikoUsers", JSON.stringify(updatedUsers));
    localStorage.setItem("pikoUser", JSON.stringify(updatedUser));

    setUser(updatedUser);

    return {
        success: true
    };
}

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