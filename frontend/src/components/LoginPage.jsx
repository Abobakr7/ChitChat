import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
    const { setCurrentUser } = useAuth();
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/chat";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const response = await axios.post(
                "/auth/login",
                JSON.stringify(formData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setCurrentUser(response.data.user);
            navigate(from, { replace: true });
        } catch (err) {
            if (err?.response?.status >= 500) {
                setError("Login Failed");
            } else {
                setError(err?.response?.data?.message || "Login Failed");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-8 text-center">
                Log in to ChitChat
            </h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                {error && (
                    <div className="text-red-500 mb-4 text-center">
                        {error.split(",").map((err, i) => (
                            <p key={i}>{err}</p>
                        ))}
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="identifier" className="block mb-2">
                        Email/Username
                    </label>
                    <input
                        type="identifier"
                        id="identifier"
                        name="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4 disabled:bg-gray-300"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging In..." : "Log In"}
                </button>
                <p className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </form>
        </>
    );
}
