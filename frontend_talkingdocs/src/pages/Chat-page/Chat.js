import React,{useEffect, useState} from 'react'
import "./chat-styles.css";
import { useNavigate } from 'react-router-dom';
import Fileinput from '../../components/Commoncomponents/FileInput/Fileinput';
import { toast } from 'react-toastify';
import ResponsiveAppBar from '../../components/Navbar/ResponsiveAppBar';
import Messagebox from '../../components/Messagebox/Messagebox';
import Input from "../../components/Commoncomponents/Input/Input";
import Button from "../../components/Commoncomponents/Button/Button";
import axios from 'axios';

function Chat() {

  let navigate= useNavigate();

  let [pdffile,setPdffile]=useState("");

  let [loading,setLoading]=useState(false);

  function pdffileupload(files) {
    setPdffile(files);
  }

  async function uploadpdf () {
    if(!pdffile) {
      toast.error("Plese Select the File to upload");
      return ;
    }
   try {
    console.log("Uploading doc...")
         setLoading(true);

         const formData = new FormData();
           formData.append('pdfs',pdffile[0] );

           console.log(formData,"file",pdffile[0])

         let uploadresponse = await axios.post('http://localhost:8081/actions/uploadpdfs',formData,{headers:{'Content-Type': 'multipart/form-data',"Token-DocsAI":`Bearer ${localStorage.getItem('token')}`}})

           setLoading(false);
           toast.success('Document Uploading Completed');
           console.log("Document Uploading Completed.")
           analysedoc();
   }
   catch(error) {
    setLoading(false);
    toast.error(`Error:${error.response.data.message}`);
    console.log("Some Error Occured :",error)
   }
  }

  async function analysedoc() {
    
        try {
         console.log("Anlysing doc...")
         setLoading(true);

         let analysedocumentresponse = await axios.get('http://localhost:8081/actions/analyse',{headers:{"Token-DocsAI":`Bearer ${localStorage.getItem('token')}`}})

           setLoading(false);
           toast.success('Document Analysing Completed');
           console.log("Document Analysing Completed.")
           
     }
     catch(error){
         setLoading(false);
         console.log("heleo",error)
         toast.error(`Error:${error.response.data.message}`);
         console.log("Some Error Occured :",error.response.data.message)
     }
 
 }

  useEffect(()=>{
    if(!localStorage.getItem('token'))
    {
      toast.info("Please Login to go to PDF Chat")
      navigate('/login')
    }
  },[])

  return (<>
    <ResponsiveAppBar/>
    <div className='chatcontents'>
      <Fileinput text="Click To Select PDF File"  accept="application/pdf" id="banner-img" filehandlingfunc={pdffileupload}/>
      
<div style={{display:"flex",columnGap:"60px"}}>
      {/* //Upload Button */}
      
<button onClick={uploadpdf} type="button" class="btn btn-primary">{loading ? <div><div className="spinner-border spinner-border-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow spinner-grow-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>: "Upload & Anlyse Doc"}</button>
</div>
      <Messagebox/>
      <Input type='text' required={true} placeholder='Enter your query from pdf data'/>
    </div>
    </>
  )
}

export default Chat
