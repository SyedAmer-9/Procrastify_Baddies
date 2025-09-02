import { createContext,useState,useContext } from "react";

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [token,setToken]= useState(localStorage.getItem('token'));


const loginContext = (newToken)=>{
    localStorage.setItem('token',newToken);
    setToken(newToken);
}

const logoutContext = ()=>{
    localStorage.removeItem('token');
    setToken(null);
};

const value = {
    token,
    login:loginContext,
    logout:logoutContext,
    isAuthenticated:!!token
}  


return (
    <AuthContext.Provider value = {value}>
        {children}
    </AuthContext.Provider>
)
}