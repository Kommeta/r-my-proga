import axios from "axios";
import React, { useState} from "react";
//import { useEffect } from "react";
import ButtonSmall from "../components/UI/button/ButtonSmall";


export const Profile = () => {

  // состояние для хранения имени загружаемого файла
  const [avatarImage, setAvatarImage] = useState();
  
  // состояние для хранения URL загружаемого файла
  const [imageUrl, setImageUrl] = useState();
  
  const fileReader = new FileReader();
  fileReader.onloadend = () => {
    setImageUrl(fileReader.result)
  }

  const handleOnChange = (e) => {
    //e.preventDefault();
    const files = e.target.files;
    setAvatarImage(files[0]);
    fileReader.readAsDataURL(files[0]);

    const formData = new FormData()
    formData.append('file', files[0])
    axios.post('http://localhost:3000/avatar', formData)
  }



  return (
    <>
      <h1>Кабинет пользователя</h1>
      <div className="avatar-profile">
        <img src={imageUrl ? imageUrl : '/images/avatar-no.png'} 
          alt="avatar" 
          />
      </div>
      <p style={{marginBottom: "15px"}}>
        {avatarImage ? avatarImage.name : ""}
      </p>
      <ButtonSmall
        
      >
        удалить аватар
      </ButtonSmall>
      <form style={{marginTop: "30px"}}>
        <label for="file-loader" className="label-file__btn">
          Загрузить фото
        </label>
        <input 
          id="file-loader"
          className="input-file"
          onChange={e => handleOnChange(e)}
          accept="image/*"
          type="file" 
          placeholder="Загрузить аватар"
        />
        <ButtonSmall 
          
          >
          сохранить изменения
        </ButtonSmall>
      </form>
      
    </>
  )}
