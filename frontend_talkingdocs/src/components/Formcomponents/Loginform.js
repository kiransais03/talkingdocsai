import React,{useEffect, useState} from "react";
import Input from "../../components/Commoncomponents/Input/Input";
import Button from "../Commoncomponents/Button/Button";
import { useNavigate,useLocation } from "react-router-dom";

import {toast} from "react-toastify"
import axios from "axios";


const Loginform =()=>{

   let location = useLocation();
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");

    let [loading,setLoading]=useState(false);

    let navigate1= useNavigate();


    

   async function handleLogin() {
       if(email && password && email.includes('@')) {
           try {
            console.log("Logging in....")
            setLoading(true);

            let loginUserdata = await axios.post('http://localhost:8081/user/login',{"loginId" : email,
            "password" : password})

          
              console.log(loginUserdata.data.data.token);
              localStorage.setItem('token',loginUserdata.data.data.token);
              setLoading(false);
              toast.success('Login Successful');
              console.log("Login Successfull.")
             navigate1("/chat")
              
        }
        catch(error){
            setLoading(false);
            toast.error(`Error:${error.response.data.message}`);
            setPassword("")
            console.log("Some Error Occured :",error.response.data.message)
        }
    }
    else {
        setLoading(false);
        if(!email || !password)
    {
        toast.error('All the fields are required!');
    }
    else if(!email.includes('@'))
    {
        toast.error("Please enter valid EmailId");
    }
        
    }
    }

    return(<>
            <Input type="text" placeholder="Email" state={email} setState={setEmail} required={true}/>
            <Input type="password" placeholder="Password" state={password} setState={setPassword} required={true}/>
            <Button text={loading ? <div><div className="spinner-border spinner-border-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow spinner-grow-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>: "Login"} onClick={handleLogin}/>
        </>
    )
}

export default Loginform;