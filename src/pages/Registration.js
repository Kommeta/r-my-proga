import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonMain from "../components/UI/button/ButtonMain";
import MyInput from "../components/UI/input/MyInput";

export const Registration = () => {

  // управление значением, которое будет в инпуте
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //отражает состояние был ли курсор в инпуте
  const [nameDirty, setNameDirty] = useState(false)
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)

  // управление состояние при ошибке
  const [nameError, setNameError] = useState('Поле имени не может быть пустым')
  const [emailError, setEmailError] = useState('Поле еmail не может быть пустым')
  const [passwordError, setPasswordError] = useState('Необходимо ввести пароль')

  // состояние валидна форма или нет
  const [formValid, setFormValid] = useState(false)


  useEffect(() => {
    if (nameError || emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nameError, emailError, passwordError])

    // меняем дифолтное значение инпута, на то что вводит пользователь
    const nameHandler = (e) => {
      setName(e.target.value)
      if (e.target.value.length < 1 || e.target.value.length > 25) {
        setNameError('Имя должено состоять от 1 до 25 символов')
        if (!e.target.value) {
          setNameError('Необходимо ввести имя')
        }
      } else {
        setNameError('')
      }
    }
  // меняем дифолтное значение инпута, на то что вводит пользователь
  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный email')
    } else {
      setEmailError('')
    }
  }
  // меняем дифолтное значение инпута, на то что вводит пользователь
  const passwordlHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length > 15) {
      setPasswordError('Пароль должен быть длиннее 3 и менее 15 символов')
      if (!e.target.value) {
        setPasswordError('Необходимо ввести пароль')
      }
    } else {
      setPasswordError('')
    }
  }

  // момент, когда пользователь покинул поле ввода
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'name' :
        setNameDirty(true)
        break
      case 'email' :
        setEmailDirty(true)
        break
      case 'password' : 
        setPasswordDirty(true)
        break
    }
  }
  
  const navigate = useNavigate();

  const registrationUser = async() => {

    // fetch('http://127.0.0.1:8000/api/v1/user/register/', {
    //   method: 'POST',
    //   body: JSON.stringify({email,password}),
    //   headers: {
    //     'Content-Type': 'application/json'}
    // })

    try {
      const data = {first_name: name, email, password}
      console.log(data);
      const response = await axios.post('http://127.0.0.1:8000/api/v1/user/register/', data)
      alert('Вы успешно зарегистрированы!')
      if (response.data.succsses) {
        localStorage.setItem('token', response.data.token)
        navigate('/')
        navigate(0)
      }
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <>
      <form 
        style={{width: '300px'}}
      >
        <h1 style={{marginBottom: '25px'}}>Регистрация</h1>

        {(nameDirty && nameError) && <div style={{color: 'red'}}>{nameError}</div>}
        <MyInput
          value={name}
          onChange={e => nameHandler(e)}
          onBlur = {e => blurHandler(e)}
          name="name"
          type="text"
          placeholder="Введите ваше имя"
        />

        {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
        <MyInput
          value={email}
          onChange={e => emailHandler(e)}
          onBlur = {e => blurHandler(e)}
          name="email"
          type="text"
          placeholder="Введите ваш email"
        />

        {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
        <MyInput 
          value={password}
          onChange={e => passwordlHandler(e)}
          onBlur = {e => blurHandler(e)}
          name="password" 
          type="text" 
          placeholder="Введите ваш пароль"
        />
        <ButtonMain 
          onClick={() => registrationUser()}
          className="btn btn-fiolet" 
          disabled={!formValid} 
          type='button'
          >
          зарегистрироваться
        </ButtonMain>
      </form>

      <div className="block-link">
        <h3>Уже зарегистрированы?</h3>
        <NavLink to="/sign-in">
          перейти на страницу для входа
        </NavLink>
      </div>
    </>
  )}

