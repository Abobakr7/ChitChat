import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import logo from "../../assets/icon.png";
import { toast } from "react-toastify";

export default function Header() {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("/auth/logout", null);
            setCurrentUser(null);
            navigate("/login");
        } catch {
            toast.error("Failed to log out. Please try again.");
        }
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <img
                        src={logo}
                        alt="ChitChat Logo"
                        className="w-12 h-12 object-contain"
                    />
                    <span className="text-2xl font-bold">ChitChat</span>
                </Link>

                {currentUser && (
                    <nav>
                        <ul className="flex space-x-4">
                            {["chat", "search", "friends", "profile"].map(
                                (path) => (
                                    <li key={path}>
                                        <Link
                                            to={`/${path}`}
                                            className="hover:underline capitalize"
                                        >
                                            {path}
                                        </Link>
                                    </li>
                                )
                            )}
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="hover:underline"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
