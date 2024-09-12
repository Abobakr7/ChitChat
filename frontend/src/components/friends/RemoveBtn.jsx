import axios from "../../api/axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function RemoveBtn({ friendId, setFriends }) {
    const handleRemoveFriend = async (id) => {
        try {
            await axios.delete(`/friends/${id}`);
            setFriends((prevFriends) =>
                prevFriends.filter((friend) => friend._id !== id)
            );
        } catch {
            toast.error("Couldn't remove friend");
        }
    };

    return (
        <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => handleRemoveFriend(friendId)}
        >
            Remove
        </button>
    );
}
