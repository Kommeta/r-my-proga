import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./../images/logo-kubtel.svg"
import "./../styles/Header.scss"

const Header = () =>  {
  return (
    <>
      <nav>
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
              Отзывы
            </NavLink>
            <NavLink to="/about">
              О нас
            </NavLink>
          </div>
        </div>    
      </nav>
    
    </>
  )
}

export default Header;