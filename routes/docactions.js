const express = require('express');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./pdfs");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"_"+file.originalname)
    },
})

const upload = multer({storage});//

app.post("/uploadpdfs",upload.array('pdfs',3),(req,res)=>{  //Endpoint of Pdf files upload

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

module.exports = app;