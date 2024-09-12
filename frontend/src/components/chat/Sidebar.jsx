import { useState, useEffect } from "react";
import NavBtns from "../friends/NavBtns";
import ConversationCard from "./ConversationCard";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function Sidebar({ setChatState }) {
    const { currentUser } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchConversations(currentPage);
    }, [currentPage]);

    const fetchConversations = async (page) => {
        try {
            const response = await axios.get("/chat/conversations", {
                param: { page, limit: 9 },
            });
            setConversations(response.data.conversations);
            setTotalPages(response.data.totalPages || 1);
        } catch {
            toast.error("Couldn't fetch conversations");
        }
    };

    return (
        <div className="w-1/4 h-full p-4 bg-gray-100 border-r border-gray-300 rounded">
            <h2 className="text-xl font-semibold mb-4">Friends</h2>
            <ul className="space-y-2">
                {conversations.map((convo) => (
                    <ConversationCard
                        key={convo._id}
                        conversation={convo}
                        friend={
                            currentUser._id === convo.members[0]._id
                                ? convo.members[1]
                                : convo.members[0]
                        }
                        setChatState={setChatState}
                    />
                ))}
            </ul>
            <NavBtns
                page={currentPage}
                setPage={setCurrentPage}
                totalPages={totalPages}
            />
        </div>
    );
}
