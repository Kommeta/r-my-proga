import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./../images/logo-kubtel.svg"
import './../styles/Header.scss'
import { Link, animateScroll as scroll } from "react-scroll";


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
            <NavLink to="/">
              Корзина: 
              <span><b> 0</b> руб.</span>
            </NavLink>
          </div>
        </div>    
      </nav>
    
    </>
  )
}

export default Header;