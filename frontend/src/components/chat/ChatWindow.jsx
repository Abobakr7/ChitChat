/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import Message from "./Message";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function ChatWindow({ chatState, setChatState }) {
    const { currentUser, socket } = useAuth();
    const [friend, setFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const chatWindowRef = useRef(null);
    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (chatState.conversation) {
            const selectedFriend =
                currentUser._id === chatState.conversation.members[0]._id
                    ? chatState.conversation.members[1]
                    : chatState.conversation.members[0];
            setFriend(selectedFriend);
            setMessages([]);
            fetchMessages(1);
        }
    }, [chatState.conversation]);

    useEffect(() => {
        const chatWindow = chatWindowRef.current;
        const handleScroll = () => {
            if (chatWindow.scrollTop === 0 && chatState.hasMoreMessages) {
                fetchMessages(chatState.currentPage + 1);
            }
        };

        if (chatWindow) {
            chatWindow.addEventListener("scroll", handleScroll);
            return () => chatWindow.removeEventListener("scroll", handleScroll);
        }
    }, [
        chatState.currentPage,
        chatState.hasMoreMessages,
        chatState.conversation,
    ]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        if (socket && chatState.conversation) {
            const handleNewMessage = (newMessage) => {
                if (newMessage.conversationId === chatState.conversation._id) {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        newMessage,
                    ]);
                }
            };

            socket.on("message", handleNewMessage);

            return () => {
                socket.off("message", handleNewMessage);
            };
        }
    }, [socket, chatState.conversation]);

    const fetchMessages = async (page) => {
        try {
            const response = await axios.get(
                `/chat/conversations/${chatState.conversation._id}/messages`,
                { params: { page, limit: 30 } }
            );

            if (response.data.messages.length > 0) {
                setMessages((prevMessages) => [
                    ...response.data.messages,
                    ...prevMessages,
                ]);
                setChatState({ ...chatState, currentPage: page });
                if (page >= response.data.totalPages) {
                    setChatState({ ...chatState, hasMoreMessages: false });
                }
            } else {
                setChatState({ ...chatState, hasMoreMessages: false });
            }
        } catch {
            toast.error("Error fetching messages. Please try again later.");
        }
    };

    return (
        <div className="flex flex-col h-full">
            <ChatHeader friend={friend} />

            <div
                className="flex-1 overflow-y-auto p-4 bg-gray-50"
                ref={chatWindowRef}
            >
                <ul className="space-y-2">
                    {messages.map((message, ind) => (
                        <Message
                            key={message._id}
                            message={message}
                            isLastMessage={ind === messages.length - 1}
                            lastMessageRef={lastMessageRef}
                            currentUser={currentUser}
                        />
                    ))}
                </ul>
            </div>

            <MessageInput
                friend={friend}
                conversation={chatState.conversation}
                setMessages={setMessages}
            />
        </div>
    );
}
