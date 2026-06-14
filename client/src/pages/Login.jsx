import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const {login : saveToken} = useAuth();

    async function login(){
        const response = await axios.post("http://localhost:3000/api/auth/login",{email,password});
        const token = response.data.token ; 
        saveToken(token);
        navigate("/dashboard");
    }

    return(
        <div>
            <input placeholder="enter your email.." value={email} type="text" onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input placeholder="enter your password.." value={password} type="text" onChange={(e)=>{setPassword(e.target.value)}}></input>
            <button onClick={login}> Submit </button>
        </div>
    )
}

export default Login;