import React from "react";
import { NavLink } from "react-router-dom";
import "./../styles/Header.scss"
import avatarLogo from "../assets/avatar-no.png"

const Header = () =>  {

  

  return (
    <>
      <nav>
        <div className="header-content">
          <img 
            src="/images/logo-kubtel.svg"
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

          <div className="link-navigation">
            <NavLink to="/authorization">
              Войти
            </NavLink>
          </div>
          

          <div style={{display: 'flex', alignItems: 'center'}}>            
            <NavLink to="/profile">
            <img src={avatarLogo} alt="" width="50px"/>
            </NavLink>

            <NavLink to="/profile">
              <img src="/images/exit-icon.png" alt="выход" width={30} style={{marginLeft: '20px'}} />
            </NavLink>
          </div>
          
        </div>    
      </nav>
    
    </>
  )
}

export default Header;