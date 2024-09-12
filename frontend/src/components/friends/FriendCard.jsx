/* eslint-disable react/prop-types */
import AcceptBtn from "./AcceptBtn";
import DeclineBtn from "./DeclineBtn";
import RemoveBtn from "./RemoveBtn";
import ChatBtn from "./ChatBtn";

export default function FriendCard({
    requestId,
    friend,
    setFriends,
    setFriendRequests,
    setSelectedPerson,
    isFriendRequest,
}) {
    return (
        <div className="mb-2 p-2 border rounded hover:bg-gray-100 flex items-center justify-between">
            <div
                className="cursor-pointer flex items-center"
                onClick={() => setSelectedPerson(friend)}
            >
                <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full mr-2"
                />
                <span>
                    {friend.name} (@{friend.username})
                </span>
            </div>

            {isFriendRequest ? (
                <div className="flex justify-end">
                    <AcceptBtn
                        requestId={requestId}
                        setFriendRequests={setFriendRequests}
                    />
                    <DeclineBtn
                        requestId={requestId}
                        setFriendRequests={setFriendRequests}
                    />
                </div>
            ) : (
                <div className="flex justify-end">
                    <ChatBtn friendId={friend._id} />
                    <RemoveBtn friendId={friend._id} setFriends={setFriends} />
                </div>
            )}
        </div>
    );
}
