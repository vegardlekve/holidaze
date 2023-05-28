import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        setIsLoggedIn(!!accessToken);
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                setIsLoggedIn(false);
            }
        } else {
            localStorage.removeItem("accessToken");
        }
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
