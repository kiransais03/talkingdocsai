import React, { useEffect } from 'react'
import ResponsiveAppBar from '../../components/Navbar/ResponsiveAppBar';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import img1 from "../../images/wall.png" 
import "./homepage-styles.css"

function Homepage() {

  let navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("token"))
    {
        toast.info("Already Logged In,first logout to use another account")
        navigate('/chat');
    }
  },[])

  
  return (<>
  <ResponsiveAppBar/>
  <div className="landdiv">
      <div className='img-div'>
         <img src={img1} style={{width:"100vw"}} alt="img12"/>
      </div>   
      <div className="App-header">
            <h1>Welcome to Docs AI Chat Assistant</h1>
            <p>PDF to QnA Chat Bot Integrated with Google Palm LLM</p>
           <div className='buttons'>
             <button type="button" style={{margin:"20px"}} className="buttons btn btn-primary btn-lg" onClick={()=>{navigate("/signup")}}>Sign Up</button> <br/>
             <button type="button" style={{margin:"20px"}} className="buttons btn btn-primary btn-lg"  onClick={()=>{navigate("/login")}}>Login</button>
           </div>
       </div>
  </div>
  </>)
  }



export default Homepage;