import axios from "axios";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react";

export const Dashboard = () => {
    const [blance,setBalance] = useState() ;

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/v1/account/balance", {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("authorization")}`
                    }
                });
                console.log("re-rendered") ;
                console.log(response.data.balance) ;
                setBalance(response.data.balance);
            } catch (err) {
                console.log("Swasti is a big don: " + err);
            }
        };

        fetchBalance(); // Call the async function to fetch the balance
    }, []); 

    return <div>
        <Appbar />
        <Balance value={blance}/> 
        <Users/> 
    </div>
}