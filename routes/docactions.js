const express = require('express');
const multer = require('multer');  //File handler 

const {analyse,queryfromuser} = require('../implementers/docactionimplementer')

const app = express();

//Multer file handler path and filename
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./pdfs");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"_"+file.originalname)
    },
})

const upload = multer({storage});

app.post("/uploadpdfs",upload.array('pdfs',1),(req,res)=>{  //Endpoint of Pdf files upload

    try {
       if(req.files.length===0)
       {
        throw new Error("Files upload failed");
       }

       console.log(req.files);
       res.status(201).send({
           status:200,
           message:"Pdf files uploaded successfully",
       })
    }
    catch(error) {
        res.status(400).send({
            status:400,
            message:"Failed to upload the pdfs"
        })
    }
    
})


app.get("/analyse",async (req,res)=>{   //Analyse the pdf data
  let relevantDocs =await analyse();

  if(Array.isArray(relevantDocs) && relevantDocs[0]==="ERROR")  //If any error is present
  {
    res.status(400).send({
        status:400,
        message:relevantDocs[1],
        errorobject:relevantDocs[2]
      })
      return ;
  }

  res.status(200).send({
    status:200,
    message:"Success", })
})


app.post("/query",async (req,res)=>{  //Get query answer from LLM
    let querydata = await queryfromuser(req.body.query);

    if(Array.isArray(querydata) && querydata[0]==="ERROR")  //If any error is present
  {
    res.status(400).send({
        status:400,
        message:querydata[1],
        errorobject:querydata[2]
      })
      return ;
  }

  res.status(200).send({
    status:200,
    message:"Success",
    querydata:querydata,  })
})



module.exports = app;