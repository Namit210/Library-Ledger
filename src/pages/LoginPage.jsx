import { API_BASE_URL } from "../config";
import { useState } from "react"
import { useAuth } from "../store/auth.jsx"


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { storeToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: username, password })
            });
            const data = await response.json();
            if (data.success) {
                storeToken(data.token);
                if (data.user.role === 'admin') {
                    window.location.href = '/admin/dashboard';
                } else if (data.user.role === 'store') {
                    // Wait for Store details before redirecting
                    try {
                        const res = await fetch(`${API_BASE_URL}/store/getbyname/${data.user.name}`);
                        if (!res.ok) throw new Error("Failed to fetch Store details");
                        const storeData = await res.json();
                        if (!storeData || !storeData._id) {
                            setError("Store details not found. Please contact admin.");
                        } else {
                            window.location.href = `/storehome/${storeData._id}`;
                        }
                    } catch (err) {
                        setError("Error fetching Store details. Please try again later.");
                    }
                }
            } else {
                setError('Login failed: ' + data.message);
            }
        } catch (err) {
            setError("Network error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[90vh] flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md font-outfit">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" name="username" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <span className="text-gray-600 text-sm">New User? </span>
                        <a href="/register" className="text-blue-600 hover:underline text-sm font-medium">Register</a>
                    </div>
                </form>
            </div>
        </div>
    );
}