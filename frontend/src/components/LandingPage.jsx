import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to ChitChat</h1>
            <p className="text-xl mb-8">
                Connect with friends and chat in real-time!
            </p>
            <div className="space-x-4">
                <Link
                    to="/signup"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Sign Up
                </Link>
                <Link
                    to="/login"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Log In
                </Link>
            </div>
        </div>
    );
}
