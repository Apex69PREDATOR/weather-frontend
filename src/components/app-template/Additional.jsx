import {React,useState,useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSun,faMoon,faLocationArrow,faArrowDown, faArrowUp, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom' 
import Week from './Week'
import Humidity from './Humidity'
import "./additional.css"
import Visibility from './Visibility'
import Airquality from './Airquality'
// import dotenv from 'dotenv'

// dotenv.config()

const Additional = (props) => {
  const nav=useNavigate()
  const [them,Setthem]=useState('s-day')
  const [weatherforecast,setWeatherforecast]=useState(null)
  const [showsun,setShowsun]=useState(true)
  const [setrise,setSetrise]=useState({})


  
    const change_unit=(e)=>{
       let btn=document.getElementById(props.unit) 
        btn.style.backgroundColor="white"
        btn.style.color="black"
      const id=e.target.id
      props.changeUnit(id)
      btn=document.getElementById(id)
      btn.style.backgroundColor="black"
      btn.style.color="white"
    }
    const change_them=(id)=>{
        Setthem(id)
        if(id==='s-day')
          setShowsun(true)
        else
        setShowsun(false)
    }
    useEffect(()=>{
     document.getElementById(props.unit).style.backgroundColor="black"
     document.getElementById(props.unit).style.color="white"
     
    },[])

    const forecast=async(place)=>{
      const res=await fetch(`https://7cc2-3-110-46-34.ngrok-free.app/forecast`,{method:"POST",headers:{
        "Content-type":"application/json"
      },body:JSON.stringify({place})})
      const obj=await res.json()
      console.log(obj)
      if(!obj.found){
       alert(obj.messege)
      }
      else{
        setWeatherforecast(obj.forecastresults)
        setSetrise({rise:obj.forecastresults[0].astro.sunrise,set:obj.forecastresults[0].astro.sunset})

      }
    }
    useEffect(()=>{
     forecast(props.place)
    },[props.place])
  return (
    <div className="additional">
      <button className="log-out" onClick={()=>{localStorage.removeItem("weatherauthtoken"); nav('/login')}} style={{position:"absolute",right:"10%",height:"5%",width:"10%",top:"2%",borderRadius:"10px",background:"linear-gradient(to right,#c4cccb,white)",transition:"0.15s ease-in-out"}}><FontAwesomeIcon icon={faRightFromBracket} style={{marginRight:"5%"}} /> Log Out</button>
        <div className="unit-select" style={{height:"12%"}}>
        <div className="unit">
        <span className='temp-unit theme' onClick={()=>{change_them('s-day')}} style={{border:them==='s-day'?"1px solid":"none"}}  id='s-day'><FontAwesomeIcon icon={faSun} color='#FFD700'/></span>
        <span className='temp-unit theme' onClick={()=>{change_them('s-night')}}  style={{border:them==='s-night'?"1px solid":"none"}} id='s-night'><FontAwesomeIcon icon={faMoon} color='#A2B9E4' /></span>
        </div>
        <div className="unit">
        <span className='temp-unit' onClick={change_unit} id='cel'>°C</span>
        <span className='temp-unit' onClick={change_unit} id='fa'>°F</span>
        </div>
    </div>
    <div className="forecast">
        {weatherforecast? weatherforecast.map(val=>{
             const d=val.date
             return<Week key={d} maxtemp={val.day.maxtemp_c} maxtempf={val.day.maxtemp_f} mintemp={val.day.mintemp_c} mintempf={val.day.mintemp_f} sunrise={val.astro.sunrise} sunset={val.astro.sunset} moonrise={val.astro.moonrise} moonset={val.astro.moonset} date={val.date} showsun={showsun} icon={val.day.condition.icon} unit={props.unit} text={val.day.condition.text} />
        }):<div>Loading ...</div> }
    </div>
    <div className="highlights" style={{height:"60%"}}>
      <h2>Today's Highlights</h2>
      <div className="content">
        <div className="box" id='uv'>
          <h3 >UV Index</h3>
          <span className='label' style={{top:"52%",left:"10%"}}>2</span>
          <span className='label' style={{top:"22%",left:"52%"}}>6</span>
          <span className='label' style={{top:"50%",right:"11%"}}>10</span>
          <span className='label' style={{bottom:"20%",right:"4%"}}>11+</span>
          <span className='scale'></span>
          <span className="semi-circle" style={{background: `conic-gradient(rgba(255, 255, 255, 0) 0% ${props.uv>2?100-(props.uv/12*100)-5:props.uv==0?100:100-(props.uv/12*100)-8 }%, gold ${props.uv>2?100-(props.uv/12*100)-5:props.uv==0?100:100-(props.uv/12*100)-8}% 100%)`,marginTop:"10%"}}>
         <span className="inner">{props.uv!==null?props.uv:"no uv found"}</span>
        </span>
        </div>
        <div className="box" id='wind-stat'>
          <h3>Wind Status</h3>
          <span className="speed">{props.windspeed.kph} <span style={{fontSize:"0.4em"}}>km/h</span></span>
          <span className='direction'> <span className="arrocircle"> <FontAwesomeIcon icon={faLocationArrow}  style={{fontSize:"1.2em",color:"blue",transition:"0.5s ease-in-out", transform: `rotateZ(${props.winddirection.includes("N")?props.winddirection.includes("NW")?-80:props.winddirection.includes("NE")?0:-45:/**/ props.winddirection.includes("S")?props.winddirection.includes("SE")?100:props.winddirection.includes("SW")?163:133:/*  */props.winddirection.includes("W")?-130:45 }deg)`}}/> </span > {props.winddirection}</span>
        </div>
        <div className="box" id='sun-info'>
        <h3>Sunrise & Sunset</h3>
        <span id='rise'><div className='sun'><FontAwesomeIcon icon={faArrowUp}/></div><p>{setrise?.rise}</p></span>
        <span id='set' style={{marginBottom:"5%"}}><div className='sun'><FontAwesomeIcon icon={faArrowDown}/></div><p>{setrise?.set}</p></span>
        </div>
        <Humidity humidity={props.humidity}/>
        <Visibility visible={props.visible}/>
        <Airquality quality={props.airquality}/>
      </div>
    </div>
    
    </div>
    
  )
}

export default Additional
