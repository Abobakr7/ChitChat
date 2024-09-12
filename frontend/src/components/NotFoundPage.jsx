import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-2xl text-gray-600 mb-8">
                Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link to="/" className="text-blue-500 underline">
                Go back to Home
            </Link>
        </div>
    );
}
