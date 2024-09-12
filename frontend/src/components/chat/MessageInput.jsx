/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function MessageInput({ friend, conversation, setMessages }) {
    const { socket } = useAuth();
    const [inputValue, setInputValue] = useState("");

    const sendMessage = async (messageText) => {
        try {
            const response = await axios.post(
                "/chat/messages",
                JSON.stringify({
                    content: messageText,
                    conversationId: conversation._id,
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
            setMessages((prevMessages) => [
                ...prevMessages,
                response.data.message,
            ]);

            socket.emit("sendMessage", {
                receiverId: friend._id,
                message: response.data.message,
            });
        } catch {
            toast.error("Failed to send message");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            sendMessage(inputValue);
            setInputValue("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-4 bg-white flex items-center space-x-2"
        >
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type a message..."
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                Send
            </button>
        </form>
    );
}
