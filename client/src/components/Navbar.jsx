import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar(){

    const {logout:deleteToken} = useAuth();
    const navigate = useNavigate();

    function logout(){
        deleteToken();
        navigate("/login");
    }
    
    return(
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <h1> Expense Tracker App </h1>
            <button onClick={logout}> Logout </button>
        </div>
    )
}

export default Navbar;