import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./../styles/Header.scss";
import axios from "axios";
import { useState } from "react";

const Header = () =>  {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false)
    navigate('/');
  }

  const [token, setToken] = useState(false);

  // состояние для хранения URL загружаемого файла
  const [imageAvatar, setImageAvatar] = useState();

  useEffect(() => {
    const isToken = localStorage.getItem('token') 
    setToken(!!isToken);
    
  }, [])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/user/me/', 
      {
        headers:
          {Authorization: `Token ${localStorage.getItem('token')}`}
      }
    ).then((res => {
      if (res.data.user?.avatar) {
        setImageAvatar(`http://127.0.0.1:8000${res.data.user?.avatar}`)
      }
    }))
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
            <NavLink to="/profile" className="link-avatar">
              <img style={{height: '100%', width: 'fit-content'}} 
              src={imageAvatar ? imageAvatar : '../images/avatar-no.png'}  alt=""/>
            </NavLink>

            <div onClick={logout}>
              <img src="/images/icon-exit.png" className="icon-exit" alt="выход" width={30} />
            </div>
          </div>
        }

        </div>    
      </nav>
    
    </>
  )
}

export default Header;