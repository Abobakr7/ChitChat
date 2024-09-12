import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

/* eslint-disable react/prop-types */
export default function ChatHeader({ friend }) {
    const { socket } = useAuth();
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        if (!socket) return;

        socket.emit("friendStatus", friend?._id, (isOnline) => {
            setIsOnline(isOnline);
        });

        return () => {
            socket.off("friendStatus");
        };
    }, [socket, friend]);

    if (!friend) {
        return <p className="text-gray-500">Loading...</p>;
    }

    return (
        <div className="bg-blue-50 p-4 shadow flex items-center">
            <img
                src={friend.avatar}
                alt={friend.name}
                className="w-12 h-12 rounded-full mr-3"
            />
            <div>
                <h2 className="font-bold">{friend.name}</h2>
                <p className="text-sm text-gray-600">@{friend.username}</p>
            </div>
            <span
                className={`ml-auto px-2 py-1 rounded-full text-sm ${
                    isOnline ? "bg-green-500 text-white" : "bg-gray-300"
                }`}
            >
                {isOnline ? "Online" : "Offline"}
            </span>
        </div>
    );
}
