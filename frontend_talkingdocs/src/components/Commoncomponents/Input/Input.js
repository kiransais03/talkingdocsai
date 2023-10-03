import React from 'react'
import "../Input/input-styles.css"

function Input({type,placeholder,state,setState,required,disabled}) {
  
  return (
    <input className='custom-input1' style={{backgroundColor:"whitesmoke"}} disabled={disabled} required={required} type={type} placeholder={placeholder} value={state} onChange={(e)=>{setState(e.target.value)}}/>
  )
}

export default Input