import axios from "../../api/axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function AcceptBtn({ requestId, setFriendRequests }) {
    const handleAcceptRequest = async (id) => {
        try {
            await axios.post(`/friends/requests/${id}/accept`, null);
            setFriendRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== id)
            );
        } catch {
            toast.error("Couldn't accept friend request");
        }
    };

    return (
        <button
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
            onClick={() => handleAcceptRequest(requestId)}
        >
            Accept
        </button>
    );
}
