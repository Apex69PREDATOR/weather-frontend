import {React,useState,useEffect} from "react";
import {createBrowserRouter,RouterProvider,Navigate}from "react-router-dom"
import Sign from "./components/signin/sign";
import Login from "./components/login/Login";
import Weather_layout from "./components/app-template/weather_layout";
import './responsive.css'


function App() {
  const [login,setLogin]=useState(false)
  const [loding,setLoding]=useState(true)
  const [name,setName]=useState(null)
  const authToken=localStorage.getItem("weatherauthtoken")

  const check_login=async()=>{
    if(authToken){
      
      const res=await fetch(`http://13.60.43.155:5005/checklogin`,{method:"POST",headers:{
        "Authorization": `Bearer ${authToken}`
      }})
      
      const checklog=await res.json()
      console.log(checklog)
      if(checklog.success){
        setLogin(true)
        setName(checklog.name)
      }
    }
    setLoding(false)

  }
  useEffect(()=>{
   check_login()
  },[])
  if(loding){
    return <div className="loader"></div>
  }
 const route=createBrowserRouter([
   {
    path:'/',
    element:login?<Weather_layout name={name} />:<Navigate to={'/login'}/>
   },
   {
    path:'/signup',
    element:<Sign/>
   },
   {
    path:'/login',
    element:<Login setname={setName}/>
   }
 ])
  return (
    <RouterProvider router={route}/>
  )
}

export default App
