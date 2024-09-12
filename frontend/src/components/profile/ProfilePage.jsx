import { useState } from "react";
import ProfileForm from "./ProfileForm";
import ProfileInfo from "./ProfileInfo";
import PasswordForm from "./PasswordForm";
import useAuth from "../../hooks/useAuth";

export default function ProfilePage() {
    const { currentUser, setCurrentUser } = useAuth();
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Your Profile
            </h1>
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4 flex items-center justify-center bg-gray-100">
                    <img
                        src={currentUser.avatar}
                        alt={`${currentUser.name}'s avatar`}
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </div>
                <div className="p-6">
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Joined since
                        </label>
                        <p className="text-gray-900 flex items-center">
                            {new Date(
                                currentUser.createdAt
                            ).toLocaleDateString()}
                        </p>
                    </div>

                    {isEditingProfile ? (
                        <ProfileForm
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            setIsEditingProfile={setIsEditingProfile}
                        />
                    ) : (
                        <ProfileInfo
                            currentUser={currentUser}
                            setIsEditingProfile={setIsEditingProfile}
                            setIsEditingPassword={setIsEditingPassword}
                            isEditingPassword={isEditingPassword}
                        />
                    )}

                    {isEditingPassword && (
                        <PasswordForm
                            setIsEditingPassword={setIsEditingPassword}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
