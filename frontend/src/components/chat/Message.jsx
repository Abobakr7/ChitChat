/* eslint-disable react/prop-types */
export default function Message({
    message,
    isLastMessage,
    lastMessageRef,
    currentUser,
}) {
    const liStyle =
        message.sender === currentUser._id
            ? "bg-gray-200 text-gray-900 self-end ml-auto"
            : "bg-blue-500 text-white self-start mr-auto";

    const divStyle =
        message.sender === currentUser._id
            ? "text-gray-500 text-right"
            : "text-black-500 text-left";

    return (
        <li
            ref={isLastMessage ? lastMessageRef : null}
            className={`p-2 rounded-lg shadow w-fit max-w-[60%] break-words ${liStyle}`}
        >
            <div>{message.content}</div>
            <div className={`text-xs mt-1 ${divStyle}`}>
                {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>
        </li>
    );
}
