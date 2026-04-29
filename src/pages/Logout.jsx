import { useEffect } from "react"
import { useAuth } from "../store/auth";


export const Logout = () => {
   const {Logout} = useAuth();
    useEffect(() => {
        Logout();
    }, [Logout])

    window.location.href = '/';
}