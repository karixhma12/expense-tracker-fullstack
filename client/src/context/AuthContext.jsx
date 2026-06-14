import {createContext,useState,useContext} from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [token,setToken] = useState(localStorage.getItem("token")||"");

    function login(tokenFromBackend){
        setToken(tokenFromBackend);
        localStorage.setItem("token",tokenFromBackend);
    }

    function logout(){
        setToken("");
        localStorage.removeItem("token");
    }

    return(
        <AuthContext.Provider value={{token,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}