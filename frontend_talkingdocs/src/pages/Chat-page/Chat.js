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
  let [loading2,setLoading2]=useState(false);

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
           await analysedoc();
           localStorage.setItem('currPdf',pdffile[0].name)
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
           console.log("Document Analysing Completed.");
           
           
     }
     catch(error){
         setLoading(false);
         console.log("heleo",error)
         toast.error(`Error:${error.response.data.message}`);
         console.log("Some Error Occured :",error.response.data.message)
     }
 
 }

 let [queryinput,setQueryinput]= useState("");

 let [qnaarray,setQnaarray] = useState([]);


 async function queryfunc (inputq) {
  try {
    console.log("Querying ...")
    setLoading2(true);
    setQueryinput("")
    setQnaarray((qnaarray)=>{return [...qnaarray,"Q."+inputq+"?"]})
    
    let queryoutput = await axios.post('http://localhost:8081/actions/query',{
      "query":inputq
  },{headers:{"Token-DocsAI":`Bearer ${localStorage.getItem('token')}`}})

      setLoading2(false);

      console.log(queryoutput,"this is op",qnaarray)

       setQnaarray((qnaarray)=>{return [...qnaarray,"Ans."+queryoutput.data.querydata.text]})
      toast.success('Document Querying Completed');
      console.log("Document Querying Completed.",qnaarray,queryoutput)
      
      
  }
  catch(error) {
    setLoading2(false);
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

    <div className='chatcontents'>
    <ResponsiveAppBar/>
      <Fileinput text="Click To Select PDF File"  accept="application/pdf" id="banner-img" filehandlingfunc={pdffileupload}/>
     {localStorage.getItem('currPdf') && <span className='colchange' style={{fontSize:"15px",display:"flex",justifyContent:"center",alignItems:"center"}}>Current Loaded File:{localStorage.getItem('currPdf')}</span> }
<div>
      {/* //Upload Button */}
      
<button onClick={uploadpdf} type="button" className="btn btn-primary">{loading ? <div><div className="spinner-border spinner-border-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow spinner-grow-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>: "Upload & Anlyse Doc"}</button> <span style={{fontSize:"10px",display:"flex",justifyContent:"center",alignItems:"center"}}>(Analysing may take 15-20 secs)</span>
</div>

{/* // */}

</div>
<div className='querysearch-div'>
      <form style={{ display: 'flex',flexDirection:"column",width:"100vw",justifyContent:"space-around",maxWidth:"1594px",columnGap:"5px" }} onSubmit={(e)=>{e.preventDefault(); queryfunc(queryinput)}}>
      <input className='custom-input1' style={{backgroundColor:"whitesmoke"}}  required type="text" placeholder="Enter your query realted to Pdf" value={queryinput} onChange={(e)=>{setQueryinput(e.target.value)}}/>
      <button disabled={localStorage.getItem('currPdf')?false:true} type="submit" className="btn btn-primary">{loading2 ? <div><div className="spinner-border spinner-border-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow spinner-grow-sm" role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>: "AskAI"}</button>
      </form>
      </div>
      <Messagebox qnadata={qnaarray}  />

    </>
  )
}

export default Chat
