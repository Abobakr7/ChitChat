import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

export default function SignupPage() {
    const { setCurrentUser } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        avatar: null,
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "avatar") {
            setFormData((prevData) => ({ ...prevData, avatar: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("username", formData.username);
        data.append("password", formData.password);
        if (formData.avatar) {
            data.append("avatar", formData.avatar);
        }

        try {
            const response = await axios.post("/auth/signup", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setCurrentUser(response.data.user);
            navigate("/profile");
        } catch (err) {
            if (err?.response?.status >= 500) {
                setError("Signup Failed");
            } else {
                setError(
                    err?.response?.data?.error?.toString() || "Signup Failed"
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-8 text-center">
                Sign Up for ChitChat
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
                    <label htmlFor="name" className="block mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
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
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="avatar" className="block mb-2">
                        Avatar (optional)
                    </label>
                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing Up..." : "Sign Up"}
                </button>
                <p className="text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </>
    );
}

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "../api/axios";
// import useAuth from "../hooks/useAuth";

// export default function SignupPage() {
//     const { setCurrentUser } = useAuth();
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         username: "",
//         password: "",
//         confirmPassword: "",
//     });
//     const [error, setError] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setIsLoading(true);
//         if (formData.password !== formData.confirmPassword) {
//             setError("Passwords do not match");
//             setIsLoading(false);
//             return;
//         }
//         try {
//             const response = await axios.post(
//                 "/auth/signup",
//                 JSON.stringify({
//                     name: formData.name,
//                     email: formData.email,
//                     username: formData.username,
//                     password: formData.password,
//                 }),
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );
//             setCurrentUser(response.data.user);
//             navigate("/profile");
//         } catch (err) {
//             if (err?.response?.status >= 500) {
//                 setError("Signup Failed");
//             } else {
//                 setError(
//                     err?.response?.data?.error.toString() || "Signup Failed"
//                 );
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <>
//             <h1 className="text-3xl font-bold mb-8 text-center">
//                 Sign Up for ChitChat
//             </h1>
//             <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//                 {error && (
//                     <div className="text-red-500 mb-4 text-center">
//                         {error.split(",").map((err, i) => (
//                             <p key={i}>{err}</p>
//                         ))}
//                     </div>
//                 )}
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block mb-2">
//                         Name
//                     </label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border rounded"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="email" className="block mb-2">
//                         Email
//                     </label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border rounded"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="username" className="block mb-2">
//                         Username
//                     </label>
//                     <input
//                         type="text"
//                         id="username"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border rounded"
//                         required
//                     />
//                 </div>
//                 <div className="mb-6">
//                     <label htmlFor="password" className="block mb-2">
//                         Password
//                     </label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border rounded"
//                         required
//                     />
//                 </div>
//                 <div className="mb-6">
//                     <label htmlFor="confirmPassword" className="block mb-2">
//                         Confirm Password
//                     </label>
//                     <input
//                         type="password"
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border rounded"
//                         required
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300"
//                     disabled={isLoading}
//                 >
//                     {isLoading ? "Signing Up..." : "Sign Up"}
//                 </button>
//                 <p className="text-center">
//                     Already have an account?{" "}
//                     <Link to="/login" className="text-blue-500 hover:underline">
//                         Login
//                     </Link>
//                 </p>
//             </form>
//         </>
//     );
// }
