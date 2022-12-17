import React from "react";
import { useState, useEffect } from "react";
import ButtonSmall from "../components/UI/button/ButtonSmall";
import MyInput from "../components/UI/input/MyInput";

export const Authorization = () => {

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
    if (e.target.value.length < 3 || e.target.value.length > 10) {
      setPasswordError('Пароль должен быть длиннее 3 и менее 10 символов')
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

  return (
    <>
    <form style={{width: '300px'}}>
      <h1 style={{marginBottom: '25px'}}>Регистрация</h1>
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
      <ButtonSmall className="btn-fiolet" 
        disabled={!formValid} type='submit'>
        зарегистрироваться
      </ButtonSmall>
    </form>
      

    </>
  )}