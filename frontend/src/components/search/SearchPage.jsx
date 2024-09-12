import { useState } from "react";
import PopupCard from "../friends/PopupCard";
import UserCard from "./UserCard";
import NavPages from "./NavPages";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUsers = async (page) => {
        try {
            setIsLoading(true);
            const response = await axios.get("/users/search", {
                params: { searchQuery, page, limit: 6 },
            });
            setSearchResults(response.data.users);
            setTotalPages(response.data.totalPages);
        } catch {
            toast.error("Failed to fetch users. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchUsers(1);
    };

    const loadPage = (page) => {
        setCurrentPage(page);
        fetchUsers(page);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Search Users</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or username"
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white p-2 rounded"
                    disabled={isLoading} // Disable during loading
                >
                    {isLoading ? "Searching..." : "Search"}
                </button>
            </form>

            {/* Loading Spinner */}
            {isLoading && <div className="loader">Loading...</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((user) => (
                    <UserCard
                        key={user._id}
                        user={user}
                        setSelectedUser={setSelectedUser}
                        setSearchResults={setSearchResults}
                        isLoading={isLoading}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <NavPages
                    totalPages={totalPages}
                    currentPage={currentPage}
                    loadPage={loadPage}
                />
            )}

            {selectedUser && (
                <PopupCard
                    selectedPerson={selectedUser}
                    setSelectedPerson={setSelectedUser}
                />
            )}
        </div>
    );
}
