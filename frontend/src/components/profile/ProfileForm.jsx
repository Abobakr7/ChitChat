/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function ProfileForm({
    currentUser,
    setCurrentUser,
    setIsEditingProfile,
}) {
    const [editedUser, setEditedUser] = useState(currentUser);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(
                "/users/me",
                JSON.stringify(editedUser),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            setEditedUser(response.data.user);
            setCurrentUser(response.data.user);
            toast.success("Profile updated successfully");
        } catch (err) {
            setError(
                err.response.data?.error?.toString() ||
                    err.response.data?.message ||
                    "Failed to update profile"
            );
        }
    };

    const handleProfileUpdateCancel = () => {
        setIsEditingProfile(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                >
                    Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                >
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Save Changes
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleProfileUpdateCancel}
                >
                    Cancel
                </button>
            </div>
            {error && (
                <div
                    className="text-red-500 mb-4 text-center"
                    onClick={() => setError("")}
                >
                    {error.split(",").map((err, i) => (
                        <p key={i}>{err}</p>
                    ))}
                </div>
            )}
        </form>
    );
}
