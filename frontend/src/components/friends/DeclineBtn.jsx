import axios from "../../api/axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function DeclineBtn({ requestId, setFriendRequests }) {
    const handleDeclineRequest = async (id) => {
        try {
            await axios.delete(`/friends/requests/${id}/decline`);
            setFriendRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== id)
            );
        } catch {
            toast.error("Couldn't decline friend request");
        }
    };

    return (
        <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => handleDeclineRequest(requestId)}
        >
            Decline
        </button>
    );
}
