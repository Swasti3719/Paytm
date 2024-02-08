import { useState } from "react"
import { BottomWarming } from "../components/BottomWarming"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios" 

export const Signup = () =>{
    const [firstName,setFirstName] = useState("") ;
    const [lastName,setLastName] = useState("") ;
    const [userName,setUserName] = useState("") ;
    const [password,setPassword] = useState("") ;


    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label = {"Sign up"}/>
                <SubHeading label={"Enter Your Information to create an account"}/>
                <InputBox onChange = {e=>{
                    setFirstName(e.target.value) ;
                }} placeholder={"Swasti"} label = {"First Name"} /> 
                <InputBox onChange = {e=>{
                    setLastName(e.target.value) ;
                }}placeholder={"Bhanja"} label = {"Last Name"} /> 
                <InputBox onChange = {e=>{
                    setUserName(e.target.value) ;
                }}placeholder={"swasti@gmail.com"} label = {"Email"} /> 
                <InputBox onChange = {e=>{
                    setPassword(e.target.value) ;
                }}placeholder={"12345678"} label = {"Password"} />
                <div className="pt-4">
                    <Button onClick = {()=>{
                        axios.post("https://localhost:3001/api/v1/user/signup" , {
                            userName,
                            firstName,
                            lastName,
                            password
                        })
                    }}label = {"Sign up"}/>
                </div> 
                <BottomWarming label = {"Already Have an Account"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    </div>
}