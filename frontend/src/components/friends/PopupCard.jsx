/* eslint-disable react/prop-types */
export default function PopupCard({ selectedPerson, setSelectedPerson }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded max-w-md w-full text-center">
                <img
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                    src={selectedPerson.avatar}
                    alt={selectedPerson.name}
                />
                <h3 className="text-xl font-semibold mb-2">
                    {selectedPerson.name}
                </h3>
                <p className="text-gray-600 mb-4">@{selectedPerson.username}</p>
                <p className="text-gray-600 mb-4">
                    Joined{" "}
                    {new Date(selectedPerson.createdAt).toLocaleDateString()}
                </p>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => setSelectedPerson(null)}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
