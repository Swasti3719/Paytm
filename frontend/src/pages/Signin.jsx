import { useNavigate } from "react-router-dom"
import { BottomWarming } from "../components/BottomWarming"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useState } from "react"

export const Signin = ()=>{
    const [username,setUsername] = useState("") ;
    const [password,setPassworrd] = useState("") ;

    const navigate = useNavigate() ;

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-200 text-center p-2 h-max px-4">
                <Heading label = {"Sign in"}/>
                <SubHeading label = {"Enter Your Credentials to access your Account"}/>
                <InputBox placeholder={"swasti@gmail.com"} label = {"Email"} onChange = {(e)=>{
                    setUsername(e.target.value) ;
                }}/>
                <InputBox placeholder={"12345"} label = {"Password"} onChange={(e)=>{
                    setPassworrd(e.target.value) ;
                }}/>
                <div className="pt-4">
                    <Button onClick = {async()=>{
                        const response = await axios.post("http://localhost:3001/api/v1/user/signin",{
                            username : username ,
                            password : password 
                        })
                        localStorage.setItem("authorization",response.data.token) ;
                        localStorage.setItem("balance",response.data.balance) ;
                        navigate("/dashboard") ;
                    }} label = {"Sign in"}/>
                </div>
                <BottomWarming label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}  