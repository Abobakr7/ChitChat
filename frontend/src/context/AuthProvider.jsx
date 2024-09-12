import { createContext, useState, useEffect, useMemo } from "react";
import io from "socket.io-client";
import axios from "../api/axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get("/users/me", {
                    signal: controller.signal,
                });
                const { user } = response.data;
                setCurrentUser(user);
            } catch (err) {
                if (err.name !== "AbortError") {
                    toast.warn("Please Authenticate");
                }
            }
        };

        fetchCurrentUser();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (!currentUser) return;

        const newSocket = io(import.meta.env.VITE_HOST_NAME, {
            withCredentials: true,
            autoConnect: true,
        });

        newSocket.emit("addUser", currentUser._id);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [currentUser]);

    const contextValue = useMemo(
        () => ({ currentUser, setCurrentUser, socket }),
        [currentUser, socket]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
