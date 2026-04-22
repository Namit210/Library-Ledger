import { Link } from "react-router-dom"
import { useAuth } from "../store/auth"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"

export default function NavBar(){
    const {token} = useAuth()
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(decoded.role);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [token]);
    return(
        <div className="bg-blue-300 text-white p-2 text-xl font-bold text-center gap-4 flex items-center justify-center">
            {role === 'admin' && <Link to="/admin/dashboard" className="ml-4">Admin Home</Link>}

            {token ? (
                <>
                <Link to="/logout">Logout</Link>
                </>
            ) : (
                <>
                <Link to="/" >Login</Link>
                <Link to="/register" >Register</Link>   
                </>
            )}
            
        </div>
    )
}