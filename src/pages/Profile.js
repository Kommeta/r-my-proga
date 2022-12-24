import axios from "axios";
import React, { useState, useEffect} from "react";
import '../styles/Profile.scss';
import ButtonLink from "../components/UI/button/ButtonLink";
import MyInput from "../components/UI/input/MyInput";


export const Profile = () => {
  
  // состояние для хранения URL загружаемого файла
  const [imageUrl, setImageUrl] = useState();

//const [uploadImage, setUploadImage] = useState();

  // данные юзера из сервера
  const [dataUser, setDataUser] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/user/me/', 
      {
        headers:
          {Authorization: `Token ${localStorage.getItem('token')}`}
      }
    ).then((res => {
      setDataUser(res.data.user)
      if (res.data.user?.avatar) {
        setImageUrl(`http://127.0.0.1:8000${res.data.user?.avatar}`)
      }
    }));
  }, [])


  const handleOnChange = (e) => {
    //e.preventDefault();
    const files = e.target.files;
    const fileReader = new FileReader();

    fileReader.readAsDataURL(files[0]);

    fileReader.onloadend = () => {
    setImageUrl(fileReader.result)
    const img = fileReader.result.split(',')[1]

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

  // раскрытие/скрытие формы для изменения имени пользователя 
  const [openInputName, setOpenInputName] = useState(true);
  const onClickOpenInputName = () => {
    setOpenInputName(!openInputName)
  };

  // раскрытие/скрытие формы для изменения email пользователя 
  const [openInputEmail, setOpenInputEmail] = useState(true);
  const onClickOpenInputEmail = () => {
    setOpenInputEmail(!openInputEmail)
  };

  // раскрытие/скрытие формы для изменения пароль пользователя 
  const [openInputPassword, setOpenInputPassword] = useState(true);
  const onClickOpenInputPassword = () => {
    setOpenInputPassword(!openInputPassword)
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

          <ButtonLink onClick={onClickOpenForm} className="profile__btn-outline">
            изменить аватар
            <img src="/images/icons/icon-down.png" alt="раскрыть список" width={12} height={10} 
              className={`sidebar ${!openForm ? 'icon-down ' : '' }`}
              style={{marginLeft: '10px'}}/>
          </ButtonLink>

          {
            !openForm ?
            <div style={{marginTop: '15px'}}>
              <ButtonLink
                className="profile__btn-dark"
              >
                удалить фото
              </ButtonLink>
              <form className="profile__form">
                <label for="file-loader" className="profile__label-btn profile__btn-dark">
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
          
          <div>
            <h3 style={{marginBottom: '20px'}}>Пользователь:</h3>
            {
              !openInputName ?
              <h4 style={{color: '#000'}}>Введите новое имя:</h4>
              : ''
            }
          </div>
          <div>
            <p style={{marginBottom: '5px'}}> {dataUser?.first_name}
              </p> 
              {
                !openInputName ? 
                <form>
                  {(nameDirty && nameError) && <p style={{color: 'red'}}>{nameError}</p>}
                  <MyInput
                    value={name}
                    onChange={e => nameHandler(e)}
                    onBlur = {e => blurHandler(e)}
                    name="name" 
                    type='text'>
                  </MyInput>
                </form>
                : 
                ''
              }
          </div>
          
          <div>
            <ButtonLink onClick={onClickOpenInputName} className="profile__btn-outline">
              изменить
              <img src="/images/icons/icon-down.png" alt="раскрыть список" width={12} height={10} 
                className={`sidebar ${!openInputName ? 'icon-down ' : '' }`}
                style={{marginLeft: '10px'}}/>
            </ButtonLink>
            {
            !openInputName ?
            <ButtonLink 
              disabled={!formValidName}
              className="profile__btn-dark">
              сохранить
            </ButtonLink>
              : ''
            }
          </div>

          <div>
            <h3 style={{marginBottom: '20px'}}>Email: </h3>
            {
              !openInputEmail ? 
              <h4 style={{color: '#000'}}>Введдите новый email</h4> : ''
            }
            
          </div>
          <div>
            <p style={{marginBottom: '5px'}}>{dataUser?.email}</p>
            {
              !openInputEmail ? 
              <form>
                {(emailDirty && emailError) && <p style={{color: 'red'}}>{emailError}</p>}
                <MyInput 
                value={email}
                onChange={e => emailHandler(e)}
                onBlur = {e => blurHandler(e)}
                name="email"
                type="text">
              </MyInput>
              </form>
              : ''
            }
          </div>
          <div>
            <ButtonLink onClick={onClickOpenInputEmail} className="profile__btn-outline">
              изменить
              <img src="/images/icons/icon-down.png" alt="раскрыть список" width={12} height={10} 
              className={`sidebar ${!openInputEmail ? 'icon-down ' : '' }`}
              style={{marginLeft: '10px'}}/>
              </ButtonLink>
            {
              !openInputEmail ? 
              <ButtonLink 
                disabled={!formValidEmail}
                className="profile__btn-dark">
                сохранить
              </ButtonLink>
              : ''
            }
          </div>
          
          <div>
            <h3 style={{marginBottom: '20px'}}>Пароль </h3>
            {
              !openInputPassword ? 
              <h4 style={{color: '#000'}}>Введите новый пароль</h4> : ''
            }
          </div>
          <div>
            <p>ХХХХХХ</p>
            {
              !openInputPassword ? 
              <form>
                { (passwordDirty && passwordError) && <p style={{color: 'red'}}>{passwordError}</p>}
                <MyInput 
                  value={password}
                  onChange={e => passwordlHandler(e)}
                  onBlur = {e => blurHandler(e)}
                  name="password" 
                  type="text" 
                />
              </form>
              : ''
            }
          </div>
          <div>
            <ButtonLink onClick={onClickOpenInputPassword} className="profile__btn-outline">
              изменить
              <img src="/images/icons/icon-down.png" alt="раскрыть список" width={12} height={10} 
                  className={`sidebar ${!openInputPassword ? 'icon-down ' : '' }`}
                  style={{marginLeft: '10px'}}/>
            </ButtonLink>
            {
              !openInputPassword ?
              <ButtonLink 
                disabled={!formValidPassword}
                className="profile__btn-dark">
                сохранить
              </ButtonLink>
              : ''
            }
          </div>

        </div>
      </div>
    </>
  )}
