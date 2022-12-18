import React, {useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonSmall from "../components/UI/button/ButtonSmall";
import MyInput from "../components/UI/input/MyInput";

export const SignIn = () => {

// управление значением, которое будет в инпуте
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

//отражает состояние был ли курсор в инпуте
const [emailDirty, setEmailDirty] = useState(false)
const [passwordDirty, setPasswordDirty] = useState(false)

// управление состояние при ошибке
const [emailError, setEmailError] = useState('Email не может быть пустым')
const [passwordError, setPasswordError] = useState('Необходимо ввести пароль')

// состояние валидна форма или нет
const [formValid, setFormValid] = useState(false)

const [errorResponse, setErrorResponse] = useState('')


useEffect(() => {
  if (emailError || passwordError) {
    setFormValid(false)
  } else {
    setFormValid(true)
  }
}, [emailError, passwordError])

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
    case 'email' :
      setEmailDirty(true)
      break
    case 'password' : 
      setPasswordDirty(true)
      break
  }
}

const navigate = useNavigate();

const signInUser = async() => {
  try {
    const data = {email, password}
    const response = await axios.post('http://127.0.0.1:8000/api/v1/user/login/', data)
    //alert('пользователь найден')
    if (response.data.succsses) {
      localStorage.setItem('token', response.data.token)
      navigate('/profile')
      navigate(0)
    }
  } catch (error) {
    setErrorResponse(error?.response.data.message)
  }
}

  return (
    <>
      <form style={{width: '300px'}}>
        <h1 style={{marginBottom: '25px'}}>Вход</h1>

        { (!!errorResponse) && <div style={{color: 'red'}}>{errorResponse}</div>}

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
        <ButtonSmall 
          onClick={() => signInUser()}
          className="btn-fiolet" 
          disabled={!formValid} 
          type='button'
          >
          войти
        </ButtonSmall>
      </form>

      <div className="block-link">
        <h3>Еще нет учетной записи?</h3>
        <NavLink to="/registration">
          перейти для регистрации
        </NavLink>
      </div>
    </>
  )}