import axios from "axios";
import React, { useState, useEffect} from "react";
import '../styles/Profile.scss';
import ButtonList from "../components/UI/button/ButtonList";
import MyInput from "../components/UI/input/MyInput";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonMain from "../components/UI/button/ButtonMain";


export const Profile = () => {

  // состояние для хранения URL загружаемого файла avatar
  const [imageUrl, setImageUrl] = useState();
  // данные юзера из сервера
  const [dataUser, setDataUser] = useState('');
  
  const [upDate, setUpDate] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/user/me/', 
      {
        headers:
          {Authorization: `Token ${localStorage.getItem('token')}`}
      }
    ).then((res => {
      setDataUser(res.data.user)
      setUpDate(res.data.user)
      //console.log(res.data.user);
      if (res.data.user?.avatar) {
        setImageUrl(`http://127.0.0.1:8000${res.data.user?.avatar}`)
      }
    }));
  }, [])

  
  //const [requestData, setRequestData] = useState();
  // const updateState = (dataObj) => {
  //   if (!!requestData){
  //     const newState = requestData.map(obj, val => {
  //         return {...obj, dataObj};
  //         setRequestData(obj);
  //     });
  //   } else {
  //     setRequestData(dataObj)
  //   }
  //   return
  // };


  const removeAvatar = () => {
    axios.patch(`http://127.0.0.1:8000/api/v1/user/update/`,
    {
      avatar: ''
    },
    {
      headers: {Authorization: `Token ${localStorage.getItem('token')}`}
    }
    ).then((res) => {
      setDataUser(res.data.user)
      //setImageUrl('')
      navigate(0)
    })
  }

  const handleOnChange = (e) => {
    //e.preventDefault();
    const files = e.target.files;
    const fileReader = new FileReader();

    fileReader.readAsDataURL(files[0]);
    fileReader.onloadend = () => {
    setImageUrl(fileReader.result)
    const img = fileReader.result.split(',')[1]
    // setUpDate(setUpDate.avatar = 
    //   {
    //     file_name: files[0].name,
    //     data: img,
    //   }
    // )
    
    // updateState({avatar: {
    //   file_name: files[0].name,
    //   data: img,
    // }})

      axios.patch('http://127.0.0.1:8000/api/v1/user/update/', 
        {
          avatar: {
            file_name: files[0].name,
            data: img,
          }
        },
        {
          headers:
          {Authorization: `Token ${localStorage.getItem('token')}`}
        }
      )
      .then((res) => {
        console.log(res.data.user);
        setDataUser(res.data.user)
        if (res.data.user?.avatar) {
          setImageUrl(`http://127.0.0.1:8000${res.data.user?.avatar}`)
        }
        navigate(0)
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  // раскрытие/скрытие формы для изменения аватара  
  const [openForm, setOpenForm] = useState(true);
  const onClickOpenForm = () => {
    setOpenForm(!openForm)
  };

  // раскрытие/скрытие формы для изменения данных пользователя 
  const [openInput, setOpenInput] = useState(true);
  const onClickOpenInput = () => {
    setOpenInput(!openInput)
  };

  // управление значением, которое будет в инпуте
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //отражает состояние был ли курсор в инпуте
  const [nameDirty, setNameDirty] = useState(false)
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  // управление состояние при ошибке
  const [nameError, setNameError] = useState('Необходимо ввести имя')
  const [emailError, setEmailError] = useState('Email не может быть пустым')
  const [passwordError, setPasswordError] = useState('Необходимо ввести пароль')

  // состояние валидна форма или нет
  const [formValidName, setFormValidName] = useState(false);
  const [formValidEmail, setFormValidEmail] = useState(false);
  const [formValidPassword, setFormValidPassword] = useState(false);

  useEffect(() => {
    nameError ? setFormValidName(false) : setFormValidName(true)
    emailError ? setFormValidEmail(false) : setFormValidEmail(true)
    passwordError ? setFormValidPassword(false) : setFormValidPassword(true)

  }, [nameError, emailError, passwordError])

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
  const nameHandler = (e) => {
    setName(e.target.value) 
    if (e.target.value.length < 1 || e.target.value.length > 25) {
      setNameError('Имя должно быть не менее 1 и не более 25 символов')
      if (!e.target.value) {
        setNameError('Необходимо ввести имя')
      }
    } else {
      setNameError('')
    }
      //   axios.patch('http://127.0.0.1:8000/api/v1/user/update/', 
      //   {
      //     first_name: name
      //   },
      //   {
      //     headers:
      //     {Authorization: `Token ${localStorage.getItem('token')}`}
      //   }
      // )
      // .then((res) => {
      //   console.log(res.data.user);
      //   setDataUser(res.data.user)
      // })
      // .catch((error) => {
      //   console.log(error);
      // })
    //updateState({first_name: e.target.value});
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

    const updateProfile = (name) => {
      axios.patch('http://127.0.0.1:8000/api/v1/user/update/', 
        {
          first_name: name
        },
        {
          headers:
          {Authorization: `Token ${localStorage.getItem('token')}`}
        }
      )
      .then((res) => {
        //console.log(res.data.user);
        setDataUser(res.data.user);
        navigate(0)
      })
      .catch((error) => {
        console.log(error);
      })
    }

  return (
    <>
      <h1>Кабинет пользователя</h1>
      <div className="profile__wrapper">

        <div className="profile__card-left">
          <div className="profile__avatar">
            <img src={imageUrl ? imageUrl : '/images/avatar-no.png'} 
              alt="avatar" 
              />
          </div>

          <ButtonList
            onClick={onClickOpenForm}
            className="btn btn-sm btn-list-sun"
            >
            изменить аватар
          </ButtonList>

          {
            !openForm ?

            <div style={{marginTop: '15px'}}>
              <ButtonMain
                className="btn btn-sm btn-outline-cloud"
                onClick={removeAvatar}
              >
                удалить фото
              </ButtonMain>
              <form className="profile__form">
                <label for="file-loader" className="btn btn-sm btn-outline-fiolet">
                  Загрузить фото
                </label>
                <input 
                  id="file-loader"
                  className="profile__input"
                  onChange={e => handleOnChange(e)}
                  accept="image/jpeg, image/png"
                  type="file" 
                  placeholder="Загрузить аватар"
                />
              </form>

            </div>
            : ''
          }
        </div>
          
        <div className="profile__card-right">
          <div className="profile__user-data">
            <h3 style={{marginBottom: '20px'}}>Пользователь:</h3>
            <p style={{marginBottom: '5px'}}> {dataUser?.first_name} </p> 
            <h3 style={{marginBottom: '20px'}}>Email: </h3>
            <p style={{marginBottom: '5px'}}>{dataUser?.email}</p>
            <h3 style={{marginBottom: '20px'}}>Пароль </h3>
            <p>ХХХХХХ</p>
          </div>
            
          <div>
            <ButtonList
              onClick={onClickOpenInput}
              className="btn btn-sm btn-list-sun"
              >
              изменить данные
            </ButtonList>

            {
              !openInput ?
              <form action="" style={{marginTop: '20px'}} className="profile__user-updata">
                <div>
                  <h4 style={{color: '#000'}}>Введите новое имя:</h4>
                  {(nameDirty && nameError) && <p style={{color: 'red'}}>{nameError}</p>}
                </div>
                
                <MyInput
                  value={name}
                  onChange={e => nameHandler(e)}
                  onBlur = {e => blurHandler(e)}
                  name="name" 
                  type='text'>
                </MyInput>

                <div>
                  <h4 style={{color: '#000'}}>Введдите новый email</h4>
                  {(emailDirty && emailError) && <p style={{color: 'red'}}>{emailError}</p>}
                </div>
                
                <MyInput 
                  value={email}
                  onChange={e => emailHandler(e)}
                  onBlur = {e => blurHandler(e)}
                  name="email"
                  type="text">
                </MyInput>

                <div>
                  <h4 style={{color: '#000'}}>Введите новый пароль</h4>
                  { (passwordDirty && passwordError) && <p style={{color: 'red'}}>{passwordError}</p>}
                </div>
                
                <MyInput 
                  value={password}
                  onChange={e => passwordlHandler(e)}
                  onBlur = {e => blurHandler(e)}
                  name="password" 
                  type="text" >
                </MyInput>
              </form> : ''
            }
          </div>

        </div>
      </div>



      <div style={{display: 'flex', justifyContent: 'center'}}>
        <ButtonMain 
          onClick={() => updateProfile(name)}
          className="btn btn-fiolet">
        сохранить изменения
      </ButtonMain>
      </div>
      
    </>
  )}
