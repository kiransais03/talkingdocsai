import React from "react";
import Loginpage from "./pages/Login-page/Loginpage";
import {Routes,Route} from "react-router-dom";
import "./App.css"
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Signuppage from "./pages/Signup-page/Signuppage";
import Chat from "./pages/Chat-page/Chat";
import ResponsiveAppBar from "./components/Navbar/ResponsiveAppBar";
import Homepage from "./pages/Home-page/Homepage";


function App() {
  return (
    // <div className="main">
    <>
      <ToastContainer/>
      {/* <ResponsiveAppBar/> */}
      <Routes>
        <Route path='/'  element={<Homepage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/signup' element={<Signuppage/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route pathe="*" element={<Homepage/>}/>
      </Routes>
    {/* </div> */}
    </>
  );
}

export default App;
