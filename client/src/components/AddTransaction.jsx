import {useRef} from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function AddTransaction({onTransactionAdded}){
    const amountRef = useRef();
    const descriptionRef = useRef();
    const typeRef = useRef();
    const {token} = useAuth();

    async function handleSubmit(){
        //1. get values from ref
        const amount = amountRef.current.value;
        const description = descriptionRef.current.value;
        const type = typeRef.current.value;

        //2.) post to backend
        await axios.post("http://localhost:3000/api/transactions/addtransaction",{amount,description,type},{headers:{authorization:token}});

        //3.) call onTransactionAdded() to refresh the list
        onTransactionAdded();

        //4.) clear the inputs
         amountRef.current.value = "";
         descriptionRef.current.value = "";
         typeRef.current.value = "";
    }
    
    return(
        <div>
            <input ref={amountRef} type="number" placeholder="enter your amount..."></input>
            <input ref={descriptionRef} type="text" placeholder="enter more details..."></input>
            <select ref={typeRef}>
                <option value="income"> Income </option>
                <option value="expense"> Expense </option>
            </select>
            <button onClick={handleSubmit}> Submit </button>
        </div>
    )
}

export default AddTransaction;
