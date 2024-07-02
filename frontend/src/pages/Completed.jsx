import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export const Completed = ()=>{
    const navigate = useNavigate() ;
    return <div className="bg-zinc-800">
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <div className="bg-slate-400 w-[500px] h-[350px] border rounded-2xl">
                    <div className="h-full flex flex-col justify-center">
                        <div className="flex justify-center text-3xl font-serif">
                            Completed!!
                        </div>
                        <div className="pt-10 px-10 w-50">
                            <Button label = {"return to dashboard"} onClick={()=>{
                                navigate("/dashboard") ;
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}