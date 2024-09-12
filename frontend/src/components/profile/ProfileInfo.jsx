/* eslint-disable react/prop-types */
export default function ProfileInfo({
    currentUser,
    setIsEditingProfile,
    setIsEditingPassword,
    isEditingPassword,
}) {
    return (
        <>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                </label>
                <p className="text-gray-900">{currentUser.name}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                </label>
                <p className="text-gray-900">{currentUser.username}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <p className="text-gray-900">{currentUser.email}</p>
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300"
                    type="submit"
                    onClick={() => setIsEditingProfile(true)}
                    disabled={isEditingPassword}
                >
                    Edit Profile
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300"
                    type="button"
                    onClick={() => setIsEditingPassword(true)}
                    disabled={isEditingPassword}
                >
                    Edit Password
                </button>
            </div>
        </>
    );
}
