import React, {useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonMain from "../components/UI/button/ButtonMain";
import MyInput from "../components/UI/input/MyInput";

export const SignIn = () => {

const navigate = useNavigate();

const [dataUser, setDataUser] = useState({email: '', password: '', name: ''})

//отражает состояние был ли курсор в инпуте
const [inputVisit, setInputVisit] = useState({
  inputEmail: false, 
  inputPassword: false, 
  inputName: false
})

// управление состояние при ошибке
const [emailError, setEmailError] = useState('Email не может быть пустым')
const [passwordError, setPasswordError] = useState('Необходимо ввести пароль')
const [nameError, setNameError] = useState('Поле имени не может быть пустым')

// состояние валидна форма или нет
const [formValid, setFormValid] = useState(false)

const [errorResponse, setErrorResponse] = useState('')

useEffect(() => {
  if (emailError || passwordError || nameError) {
    setFormValid(false)
  } else {
    setFormValid(true)
  }
}, [emailError, passwordError, nameError])

// меняем дифолтное значение инпута, на то что вводит пользователь
const emailHandler = (e) => {
  setDataUser({...dataUser, email: e.target.value})
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(String(e.target.value).toLowerCase())) {
    setEmailError('Некорректный email')
  } else {
    setEmailError('')
  }
}

// меняем дифолтное значение инпута, на то что вводит пользователь
const passwordlHandler = (e) => {
  setDataUser({...dataUser, password: e.target.value})
  if (e.target.value.length < 3 || e.target.value.length > 15) {
    setPasswordError('Пароль должен быть длиннее 3 и менее 15 символов')
    if (!e.target.value) {
      setPasswordError('Необходимо ввести пароль')
    }
  } else {
    setPasswordError('')
  }
}

const nameHandler = (e) => {
  setDataUser({...dataUser, name: e.target.value})
  if (e.target.value.length < 1 || e.target.value.length > 25) {
    setNameError('Имя должено содержать от 1 до 25 символов')
    if (!e.target.value) {
      setNameError('Необходимо ввести имя')
    }
  } else {
    setNameError('')
  }
}

// момент, когда пользователь покинул поле ввода
const blurHandler = (e) => {
  switch (e.target.name) {
    case 'email' :
      setInputVisit({...inputVisit, inputEmail: true})
      break
    case 'password' : 
    setInputVisit({...inputVisit, inputPassword: true})
      break
    case 'name' :
      setInputVisit({...inputVisit, inputName: true})
  }
}

const signInUser = async() => {
  try {
    const data = {email: dataUser.email, password: dataUser.password}
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

const registrationUser = async() => {
  try {
    const data = {first_name: dataUser.name, email: dataUser.email, password: dataUser.password}
    //console.log(data);
    const response = await axios.post('http://127.0.0.1:8000/api/v1/user/register/', data)
    alert('Вы успешно зарегистрированы!')
    if (response.data.succsses) {
      localStorage.setItem('token', response.data.token)
      navigate('/')
      navigate(0)
    }
  } catch (error) {
    setErrorResponse(error?.response.data)
  }
}

const [openBlockRegistration, setOpenBlockRegistration] = useState(true);
const onClickOpenBlockRegistration = () => {
  setOpenBlockRegistration(!openBlockRegistration)
};

  return (
    <>

      { !openBlockRegistration ?

        <div>
          <form style={{width: '300px'}}>
            <h1 style={{marginBottom: '25px'}}>Вход</h1>
            { (!!errorResponse) && <div style={{color: 'red'}}>{errorResponse}</div>}

            {(inputVisit.inputEmail && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
            <MyInput
              value={dataUser.email}
              onChange={e => emailHandler(e)}
              onBlur = {e => blurHandler(e)}
              name="email"
              type="text"
              placeholder="Введите ваш email"
            />
            {(inputVisit.inputPassword && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
            <MyInput 
              value={dataUser.password}
              onChange={e => passwordlHandler(e)}
              onBlur = {e => blurHandler(e)}
              name="password" 
              type="text" 
              placeholder="Введите ваш пароль"
            />
            <ButtonMain 
              onClick={() => signInUser()}
              className="btn btn-fiolet" 
              disabled={!formValid} 
              type='button'
              >
              войти
            </ButtonMain>
          </form>
          <div className="block-link">
            <h3>Еще нет учетной записи?</h3>
            <NavLink onClick={onClickOpenBlockRegistration}>
              перейти для регистрации
            </NavLink>
          </div>
        </div>

        :

        <div>
          <form 
            style={{width: '300px'}}
          >
            <h1 style={{marginBottom: '25px'}}>Регистрация</h1>
            { (!!errorResponse) && <div style={{color: 'red'}}>{errorResponse}</div>}

            {(inputVisit.inputName && nameError) && <div style={{color: 'red'}}>{nameError}</div>}
            <MyInput
              value={dataUser.name}
              onChange={e => nameHandler(e)}
              onBlur = {e => blurHandler(e)}
              name="name"
              type="text"
              placeholder="Введите ваше имя"
            />

            {(inputVisit.inputEmail && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
            <MyInput
              value={dataUser.email}
              onChange={e => emailHandler(e)}
              onBlur = {e => blurHandler(e)}
              name="email"
              type="text"
              placeholder="Введите ваш email"
            />

            {(inputVisit.inputPassword && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
            <MyInput 
              value={dataUser.password}
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
            <NavLink onClick={onClickOpenBlockRegistration}>
              перейти на страницу для входа
            </NavLink>
          </div>
        </div>

      }
      
    </>
  )}