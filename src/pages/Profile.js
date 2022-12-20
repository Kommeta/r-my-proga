import axios from "axios";
import React, { useState, useEffect} from "react";
import '../styles/Profile.scss'
import ButtonSmall from "../components/UI/button/ButtonSmall";
import ButtonLink from "../components/UI/button/ButtonLink";


export const Profile = () => {

  // состояние для хранения имени загружаемого файла
  const [avatarImage, setAvatarImage] = useState();
  
  // состояние для хранения URL загружаемого файла
  const [imageUrl, setImageUrl] = useState();

  const [dataUser, setDataUser] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/user/me/', 
      {
        headers:
          {Authorization: `Token ${localStorage.getItem('token')}`}
      }
    ).then((res => {
      setDataUser(res.data.user)
      setImageUrl(`http://127.0.0.1:8000${res.data.user?.avatar}`)
      
    }));
  }, [])


  
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    setImageUrl(fileReader.result)
  }

  const handleOnChange = (e) => {
    //e.preventDefault();
    const files = e.target.files;
    setAvatarImage(files[0]);
    fileReader.readAsDataURL(files[0]);

    // const formData = new FormData()
    // formData.append('file', files[0])
    // axios.post('http://localhost:3000/avatar', formData)
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
              <p style={{marginBottom: "15px"}}>
                {avatarImage ? avatarImage.name : ""}
              </p>
          </div>
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
              accept="image/*"
              type="file" 
              placeholder="Загрузить аватар"
            />
          </form>
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
