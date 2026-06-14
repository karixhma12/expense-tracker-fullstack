import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Signup(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();

    async function signup(){
        const response = await axios.post("http://localhost:3000/api/auth/signup",{username,email,password});
        navigate("/login");
    }

    return(
        <div>
            <input placeholder="enter your username.." type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
            <input placeholder="enter your email-id.." type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input placeholder="enter your password.." type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button onClick={signup}> Submit </button>
        </div>
    )
}

export default Signup;