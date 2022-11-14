import React from "react";
import logo from "./../images/logo-kubtel.svg"

const Footer = () =>  {
  return (
    <>
      <div className="footer" >
        <img 
          src={logo} 
          height="30"
          alt="logotip" 
        />
        <p style={{color: '#fff', fontSize: '12px', margin: '15px 0 20px 15px'}} >Магазин счастливых покупок :)</p>
      </div>    
    </>
  )
}

export default Footer;