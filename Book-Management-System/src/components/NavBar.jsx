import { Link } from "react-router-dom"

export default function NavBar(){
    return(
        <div className="bg-blue-300 text-white p-2 text-xl font-bold text-center">
            <Link to="/">Logout</Link>
            <Link to="/admin/dashboard" className="ml-4">Admin Home</Link>
            <Link to="/register" className="ml-4">Register</Link>
        </div>
    )
}