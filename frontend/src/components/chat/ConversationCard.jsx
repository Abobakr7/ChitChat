/* eslint-disable react/prop-types */
export default function ConversationCard({
    conversation,
    friend,
    setChatState,
}) {
    const handleClick = () => {
        setChatState({
            conversation,
            currentPage: 1,
            totalPages: 1,
            hasMoreMessages: true,
        });
    };

    return (
        <div
            className="flex items-center p-2 bg-white cursor-pointer rounded-lg shadow hover:bg-gray-50 transition-colors"
            onClick={handleClick}
        >
            <img
                src={friend.avatar}
                alt={friend.name}
                className="w-10 h-10 rounded-full mr-3"
            />
            <div>
                <p className="font-semibold">{friend.name}</p>
                <p className="text-sm text-gray-600">@{friend.username}</p>
            </div>
        </div>
    );
}
