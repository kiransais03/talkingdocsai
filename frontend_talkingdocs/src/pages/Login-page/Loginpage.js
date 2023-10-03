import React, { useEffect } from "react";
import "../Login-page/loginpage-styles.css"
import Loginform from "../../components/Formcomponents/Loginform";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import ResponsiveAppBar from "../../components/Navbar/ResponsiveAppBar";

const Loginpage =()=>{

    let navigate=useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem("token"))
        {
            toast.info("Already Logged In,first logout to use another account")
            navigate('/chat');
        }

        document.getElementsByTagName('body')[0].style.cssText=`background: rgb(160,82,255);
            background: linear-gradient(69deg, rgba(160,82,255,1) 0%, rgba(148,233,198,0.865983893557423) 100%);
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing:antialised;
            -moz-osx-font-smoothing:greyscale;
            color:var(--white);
            max-width: 1600px;
            height: 100vh;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;`

            return ()=>{
                document.getElementsByTagName('body')[0].style.cssText=`background: rgb(160,82,255);
            background: linear-gradient(69deg, rgba(160,82,255,1) 0%, rgba(148,233,198,0.865983893557423) 100%);
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing:antialised;
            -moz-osx-font-smoothing:greyscale;
            color:var(--white);
            max-width: 1600px;
            margin:0 auto`
            }
    },[])

    return(<>    <ResponsiveAppBar/>
        <div className="input-wrapper-form">
            <h1>Login</h1>
            <Loginform/>
            <p className="login-page-redirect" onClick={()=>{navigate("/signup")}}>Doesn't have an Account?Click here to <span>Signup.</span></p>
        </div>
        </>
    )
}

export default Loginpage;