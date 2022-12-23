import axios from "axios";
import React, { useState, useEffect} from "react";
import '../styles/Profile.scss'
import ButtonSmall from "../components/UI/button/ButtonSmall";
import ButtonLink from "../components/UI/button/ButtonLink";


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
  }, [setDataUser])


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
    setOpenForm(!openList)
  };



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

          <ButtonLink onClick={onClickOpenList} className="profile__btn-outline">
            изменить аватар
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
            : <div></div>
          }
          
        </div>
          
        
        <div className="profile__card-right">

          <h3>Пользователь:</h3> 
          <p> {dataUser?.first_name}</p> 
          <ButtonLink className="profile__btn-dark">изменить</ButtonLink>

          <h3>Email: </h3>
          <p>{dataUser?.email}</p>
          <ButtonLink className="profile__btn-dark">изменить</ButtonLink>

          <h3>Пароль </h3>
          <p>ХХХХХХ</p>
          <ButtonLink className="profile__btn-dark">изменить</ButtonLink>

        </div>
      </div>
      
      
      
      
      
    </>
  )}
