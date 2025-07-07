import {React} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import "./sign.css"
// import dotenv from 'dotenv'

// dotenv.config()
const sign = () => {
  const nav=useNavigate()
    const {register,handleSubmit,reset,setError}=useForm()
    const onsubmit=async (data)=>{
      console.log(data)
      if(data.password!==data.confirm_password){
        alert("passwords dosen't match")
        return
      }
      const res=await fetch(`https://5d62-13-60-104-47.ngrok-free.app/signup`,{method:"POST",headers:{
        "Content-type":"application/json"
      },body:JSON.stringify(data)})
      const account=await res.json()
      alert(account.messege)
      if(account.created){
        nav('/login')
      }
      reset()
    }
  return (
    <>
    <div className="logcontainer">
    <form className='weather-sign' onSubmit={handleSubmit(onsubmit)}>
      <div className="sheet"></div>
      <div className="wrap">
     <label htmlFor="fstname">Firstname</label>
     <input type="text"  id="fstname" {...register("firstname",{required:true})} />
     </div>
     <div className="wrap">
     <label htmlFor="lstname">Lastname</label>
     <input type="text"  id="lstname" {...register("lastname",{required:true})} />
     </div>   
     
     <div className="wrap"><label htmlFor="email">Email</label>
     <input type="text"  id="email" {...register("email",{required:true})} /></div>
     <div className="wrap"><label htmlFor="phone">Phone no</label>
     <input type="number"  id="phone" {...register("number",{required:true})} /></div>
     <div className="wrap">
     <label htmlFor="password">Password</label>
     <input type="password" id="password" {...register("password",{required:true,min:{value:8,message:"password must be minimum 8 charecters"}})} />
     </div>
     <div className="wrap">
     <label htmlFor="confirm-password">Retype Password</label>
     <input type="password"  id="confirm-password" {...register("confirm_password",{required:true})} />
     </div>
     <button className='signin' style={{height:"10%",color:"black",borderRadius:"10px",border:"none",cursor:"pointer"}}>Sign up</button>
    </form>
    <div className="navsign" style={{left:"46%"}}>You can sign in <span  style={{color:"blue",cursor:"pointer"}} onClick={()=>{nav('/login')}}>here</span></div>
    </div>
    </>
  )
}

export default sign
