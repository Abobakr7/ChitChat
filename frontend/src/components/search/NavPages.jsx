// eslint-disable-next-line react/prop-types
export default function SearchNav({ totalPages, currentPage, loadPage }) {
    return (
        <div className="mt-4 flex justify-center">
            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => loadPage(i + 1)}
                    className={`mx-1 px-3 py-1 rounded ${
                        currentPage === i + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
}
