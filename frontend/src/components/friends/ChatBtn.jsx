import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function ChatBtn({ friendId }) {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const response = await axios.post(
                "/chat/conversations",
                JSON.stringify({ recieverId: friendId }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            navigate("/chat", {
                state: { conversation: response.data.conversation },
            });
        } catch {
            toast.error("Couldn't start chat");
        }
    };

    return (
        <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
            onClick={handleClick}
        >
            Chat
        </button>
    );
}
