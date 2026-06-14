import {Navigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({children}){
    const {token} = useAuth();

    if(!token){
        return <Navigate to="/login"/>
    }
    else{
        return children;
    }
}

export default ProtectedRoute;