/* eslint-disable react/prop-types */
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function UserCard({
    user,
    setSelectedUser,
    setSearchResults,
    isLoading,
}) {
    const sendFriendRequest = async (userId) => {
        try {
            await axios.post(`/friends/${userId}`, null);
            setSearchResults((prevResults) =>
                prevResults.map((user) =>
                    user._id === userId ? { ...user, requestSent: true } : user
                )
            );
        } catch {
            toast.error("Failed to send friend request. Please try again.");
        }
    };

    return (
        <div key={user._id} className="border p-4 rounded">
            <h2 className="font-bold">{user.name}</h2>
            <p>@{user.username}</p>

            <button
                onClick={() => setSelectedUser(user)}
                className="mt-2 bg-gray-200 p-1 rounded"
            >
                View Details
            </button>

            {!user.isFriend && !user.requestSent && (
                <button
                    onClick={() => sendFriendRequest(user._id)}
                    disabled={isLoading}
                    className={`mt-2 ml-2 p-1 rounded ${
                        isLoading ? "bg-gray-400" : "bg-green-500 text-white"
                    }`}
                >
                    {isLoading ? "Sending..." : "Add Friend"}
                </button>
            )}

            {user.requestSent && (
                <span className="mt-2 ml-2 text-gray-500">Pending</span>
            )}
        </div>
    );
}
