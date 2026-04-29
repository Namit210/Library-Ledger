import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [token, setToken] = useState(localStorage.getItem('token'));

    const Logout = ()=>{
        setToken(null);
        localStorage.removeItem('token');
    }

    const storeToken = (token)=>{
        localStorage.setItem('token', token);
    }

    return(
     <AuthContext.Provider value={{token, storeToken, Logout}}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};