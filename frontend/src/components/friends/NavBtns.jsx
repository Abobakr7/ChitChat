// eslint-disable-next-line react/prop-types
export default function NavPages({ page, setPage, totalPages }) {
    return (
        <div className="mt-4">
            <button
                className="mr-2 px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
            >
                Previous
            </button>
            <button
                className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
}
