import { useState, useEffect } from "react";
import FriendCard from "./FriendCard";
import PopupCard from "./PopupCard";
import NavBtns from "./NavBtns";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function FriendsPage() {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendsPage, setFriendsPage] = useState(1);
    const [requestsPage, setRequestsPage] = useState(1);
    const [friendsTotalPages, setFriendsTotalPages] = useState(1);
    const [requestsTotalPages, setRequestsTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPerson, setSelectedPerson] = useState(null);

    useEffect(() => {
        loadFriends();
        loadFriendRequests();
    }, [friendsPage, requestsPage, searchQuery]);

    const loadFriends = async () => {
        try {
            const response = await axios.get("/friends", {
                params: { page: friendsPage, limit: 5, searchQuery },
            });
            setFriends(response.data.friends);
            setFriendsTotalPages(response.data.totalPages || 1);
        } catch {
            toast.error("Couldn't fetch friends.");
        }
    };

    const loadFriendRequests = async () => {
        try {
            const response = await axios.get("/friends/requests", {
                params: { page: requestsPage, limit: 5 },
            });
            setFriendRequests(response.data.requests);
            setRequestsTotalPages(response.data.totalPages || 1);
        } catch {
            toast.error("Couldn't fetch friend requests.");
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setFriendsPage(1);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Friends</h1>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">
                        Your Friends
                    </h2>
                    {friends.map((friend) => (
                        <FriendCard
                            key={friend._id}
                            friend={friend}
                            setFriends={setFriends}
                            setSelectedPerson={setSelectedPerson}
                            isFriendRequest={false}
                        />
                    ))}
                    <NavBtns
                        page={friendsPage}
                        setPage={setFriendsPage}
                        totalPages={friendsTotalPages}
                    />
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">
                        Friend Requests
                    </h2>
                    {friendRequests.map((request) => (
                        <FriendCard
                            key={request._id}
                            requestId={request._id}
                            friend={request.requester}
                            setFriendRequests={setFriendRequests}
                            setSelectedPerson={setSelectedPerson}
                            isFriendRequest={true}
                        />
                    ))}
                    <NavBtns
                        page={requestsPage}
                        setPage={setRequestsPage}
                        totalPages={requestsTotalPages}
                    />
                </div>
            </div>

            {selectedPerson && (
                <PopupCard
                    selectedPerson={selectedPerson}
                    setSelectedPerson={setSelectedPerson}
                />
            )}
        </div>
    );
}
