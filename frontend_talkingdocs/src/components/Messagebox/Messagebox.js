import React from 'react'
import "./messagebox-styles.css"

function Messagebox({qnadata}) {
console.log(qnadata,"From msg box")
  
  return ( <div className='msg-box scroll'>
    {qnadata?.length>0 && 
      qnadata.map((data,index)=>{
        console.log(data,"hii")
       return (<p key={index}>{data}</p>)
      }) }
   </div>
  )
}

export default Messagebox
