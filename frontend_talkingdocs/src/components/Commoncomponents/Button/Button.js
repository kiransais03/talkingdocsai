import React from 'react';
import "../Button/button-styles.css";


function Button({onClick,text,width}) {
  return (
    <div style={width?{width:width}:{}}  onClick={onClick} className='custom-btn'>{text}</div>
  )
}

export default Button;