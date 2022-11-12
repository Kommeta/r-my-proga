import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./../images/A-logo.png"
import './../styles/Header.scss'



const Header = () =>  {
  return (
    <>
      <nav style={{margin: '20 0', padding: '10px 0', backgroundColor: 'rgb(31 0 43)', width: '100%'}}>
        <div className="header-content">
          <img 
            src={logo} 
            height="50"
            alt="logotip" 
          />
          <div className="link-navigation">
            <NavLink to="/" exact>
              Главная
            </NavLink>
            <NavLink to="/reviews">
              О нас
            </NavLink>
            <NavLink to="/basket">
              Корзина
            </NavLink>
          </div>
        </div>    
      </nav>
    
    </>
  )
}

export default Header;