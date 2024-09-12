/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

export default function PasswordForm({ setIsEditingPassword }) {
    const [editedPassword, setEditedPassword] = useState({
        oldPassword: "",
        newPassword: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPassword((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(
                "/users/me/password",
                JSON.stringify(editedPassword),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setEditedPassword({
                oldPassword: "",
                newPassword: "",
            });
            toast.success("Password updated successfully");
        } catch (err) {
            setError(
                err.response.data.message ||
                    err.response.data?.error?.toString()
            );
        }
    };

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="oldPassword"
                    >
                        Old Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="oldPassword"
                        type="password"
                        name="oldPassword"
                        value={editedPassword.oldPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="newPassword"
                    >
                        New Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="newPassword"
                        type="password"
                        name="newPassword"
                        value={editedPassword.newPassword}
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
                        onClick={() => setIsEditingPassword(false)}
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
        </div>
    );
}
