import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LandingPage from "./components/LandingPage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/profile/ProfilePage";
import FriendsPage from "./components/friends/FriendsPage";
import SearchPage from "./components/search/SearchPage";
import ChatPage from "./components/chat/ChatPage";
import NotFoundPage from "./components/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route element={<ProtectedRoute isProtected={false} />}>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Route>
                        <Route path="*" element={<NotFoundPage />} />
                        <Route element={<ProtectedRoute isProtected={true} />}>
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/friends" element={<FriendsPage />} />
                            <Route path="/search" element={<SearchPage />} />
                            <Route path="/chat" element={<ChatPage />} />
                        </Route>
                    </Routes>
                </Layout>
                <ToastContainer />
            </Router>
        </AuthProvider>
    );
}
