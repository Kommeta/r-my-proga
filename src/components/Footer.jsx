import React from "react";
import logo from "./../images/logo-kubtel.svg"

const Footer = () =>  {
  return (
    <>
      <div className="footer" style={{margin: '20 0', padding: '15px 0 5px ', backgroundColor: 'rgb(0 0 0)', width: '100%', textAlign: 'center'}} >
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