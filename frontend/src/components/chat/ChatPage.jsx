import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function Chat() {
    const [chatState, setChatState] = useState({
        conversation: null,
        currentPage: 1,
        totalPages: 1,
        hasMoreMessages: true,
    });
    const location = useLocation();

    useEffect(() => {
        if (location.state?.selectedConversation) {
            setChatState({
                ...chatState,
                conversation: location.state.conversation,
            });
        }
    }, [location.state]);

    return (
        <div className="flex h-screen">
            <Sidebar setChatState={setChatState} />
            {chatState.conversation ? (
                <div className="w-3/4 h-full">
                    <ChatWindow
                        chatState={chatState}
                        setChatState={setChatState}
                    />
                </div>
            ) : (
                <div className="w-3/4 h-full flex items-center justify-center bg-gray-50">
                    <p className="text-gray-500">
                        Select a friend to start chatting
                    </p>
                </div>
            )}
        </div>
    );
}
