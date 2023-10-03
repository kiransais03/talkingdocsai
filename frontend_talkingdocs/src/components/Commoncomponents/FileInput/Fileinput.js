import React, { useState } from 'react';
import "./fileinput-styles.css"
import uploadimg from "../../../images/file-upload-svgrepo-com.svg"

const Fileinput = ({accept,id,filehandlingfunc,text}) => {

    let [filesSelected,setFilesSelected] = useState(false);

    function onChangefunc(e) {
        // console.log(e.target);
       setFilesSelected(e.target?.files[0]?.name);
       filehandlingfunc(e.target.files);
    }


    function removefileFunc(e) {
      e.preventDefault();
      filehandlingfunc("");
      setFilesSelected(false)
    }

  return (<>
    <label className='custom-input fileinput-label' htmlFor={id}>{filesSelected ? <span>{filesSelected} <button onClick={removefileFunc}>Remove File</button></span>:<> <img className="uploadicon" src={uploadimg} alt="upl"/> {text}</> }</label>
    <input type="file" accept={accept} id={id} onChange={onChangefunc} style={{display:"none",}} disabled={filesSelected}/>
  </>
  )
}

export default Fileinput