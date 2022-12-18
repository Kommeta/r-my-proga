import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./../styles/Header.scss";
import avatarLogo from "../assets/avatar-no.png";
import { useState } from "react";

const Header = () =>  {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false)
    navigate('/');
  }

  const [token, setToken] = useState(false);

  useEffect(() => {
    const isToken = localStorage.getItem('token') 
    setToken(!!isToken);
    
  }, [])

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

        {
          !token ? 
          <div className="link-navigation">
            <NavLink 
              to="/sign-in"
              >
              Войти
            </NavLink>
          </div>
          :
          <div style={{display: 'flex', alignItems: 'center'}}>            
            <NavLink to="/profile">
            <img src={avatarLogo} alt="" width="50px"/>
            </NavLink>

            <div onClick={logout}>
              <img src="/images/exit-icon.png" alt="выход" width={30} style={{marginLeft: '20px'}} />
            </div>
          </div>
        }

          
          
          
        

        </div>    
      </nav>
    
    </>
  )
}

export default Header;