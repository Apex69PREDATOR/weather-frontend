import {React,useState} from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const nav=useNavigate()
    const [issubmitting,setIssubmitting]=useState(false)
    const {register,handleSubmit}=useForm()
    const onsubmit=async(data)=>{
        setIssubmitting(true)
         const res=await fetch(`https://weather-backend-f0he.onrender.com/login`,{method:"POST",headers:{
          "Content-type":"application/json"
         },body:JSON.stringify(data)})
         const r=await res.json()
         setIssubmitting(false)
         if(r.loggin){
         if(r.token){
           localStorage.setItem("weatherauthtoken",r.token)
           
         }
        else{
        alert("some error occured signning in")
      }
         props.setname(r.name)
         
         location.href='/'
        }
        else
        alert("email or password is invalid")
    }
  return (
    <>
    <div className="logcontainer">
   {issubmitting && <div style={{position:"absolute",top:"30%",left:"40%",zIndex:"3"}}>Loading...</div>}
    <form className='weather-sign weather-log' onSubmit={handleSubmit(onsubmit)}>
      <div className="sheet"></div>
      <div className="wrap"><label htmlFor="email"><b>Email</b></label>
     <input type="text"  id="email" {...register("email",{required:true})} /></div>
     <div className="wrap"><label htmlFor="password" ><b> Password</b></label>
     <input type="text"  id="password" {...register("password",{required:true})} /></div>
     <button className='signin' style={{height:"10%",color:"black",borderRadius:"10px",border:"none",cursor:"pointer"}}>Sign in</button>
    </form>
    <div className="navsign">Don't have an account sign up <span style={{color:"blue",cursor:"pointer"}} onClick={()=>{nav('/signup')}}><i>here</i></span></div>
    </div>
    </>
  )
}

export default Login
