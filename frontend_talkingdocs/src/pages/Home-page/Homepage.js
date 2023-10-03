import React, { useEffect } from 'react'
import ResponsiveAppBar from '../../components/Navbar/ResponsiveAppBar';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

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
    <div>
      
    </div>
    </>
  )
}

export default Homepage
