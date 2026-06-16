import Navbar from "../components/Navbar";
import {useState,useEffect} from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AddTransaction from "../components/AddTransaction";


function Dashboard(){
    const [transactions,setTransactions] = useState([]);
    const {token} = useAuth();

    //fetch all transactions here 
        async function fetchTransactions(){
            const response = await axios.get("http://localhost:3000/api/transactions/transactions" ,{headers:{authorization:token}});
            setTransactions(response.data.transactions);
            console.log(transactions);
        }

    useEffect(()=>{
        fetchTransactions();
    },[])

        function income(){
            const incomeTransactions = transactions.filter((t)=>{
                return t.type==="income"
            })
            const income = incomeTransactions.reduce((sum,t)=>{
                return sum + t.amount
            },0)

            return income;
        }

        function expense(){
            const expenseTransactions = transactions.filter((t)=>{
                return t.type==="expense"
            })

            const expense = expenseTransactions.reduce((sum,t)=>{
                return sum+t.amount
            },0)

            return expense;
        }

        function balance(){
            const inc = income();
            const exp = expense();
            return inc-exp;
        }

    return(
        <div>
            <Navbar/>

            {/*Summary cards*/}
            <div>
                <div>Total Income : {income()}</div>
                <div>Total Expense : {expense()}</div>
                <div>Current Balance : {balance()}</div>
            </div>

            {/*Transaction List*/}
            <div>
                {
                    transactions.map((t)=>{
                        return <div key={t._id}>
                            <span>{t.description}</span>
                            <span>{t.type}</span>
                            <span>{t.amount}</span>
                        </div>
                    })
                }
            </div>

            {/*Add Transaction*/}    
            <div>
                <AddTransaction onTransactionAdded={fetchTransactions}/>
            </div>
        </div>
    )
}

export default Dashboard;