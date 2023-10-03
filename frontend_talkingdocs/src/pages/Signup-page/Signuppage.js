import React,{useEffect,useState} from "react";
import "./signuppage-styles.css";
import Signupform from "../../components/Formcomponents/Signupform";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ResponsiveAppBar from "../../components/Navbar/ResponsiveAppBar";

function Signuppage () {

    let navigate=useNavigate();

    console.log(localStorage.getItem('token'))


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

    return(<>
    <ResponsiveAppBar/>
        <div className="input-wrapper-form">
            <h1>Signup</h1>
            <Signupform/>
            <p className="signup-page-redirect" onClick={()=>{navigate("/login")}}>Already have an Account?Click here to <span>LogIn.</span></p>
        </div>
        </>
    )
}

export default Signuppage;