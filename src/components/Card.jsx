import React, {useState} from "react";
import ButtonSmall from "./UI/button/ButtonSmall";

const Card = ({imageUrl, title, price, onPlus}) => {

  const [isAdded, setIsAdded] = useState();

  const onClickPlus = () => {
    onPlus({imageUrl, title, price});
    setIsAdded(!isAdded)
  };

  return (
    <>
      <div className="card">
        <img 
        src={imageUrl}
        width={100}
        height={150}
        alt="" />
        <p className="card-description">
          {title}
        </p>
        <div className="card-price">
          <span>Цена:</span>
          <b>{price} руб.</b>
          <ButtonSmall 
            className={`sidebar ${isAdded ? 'btn-disabled ' : 'btn-fiolet' }`}
            onClick={onClickPlus}
            >
              {isAdded ? 'добавлен' : 'в корзину' }              
          </ButtonSmall>
        </div>
      </div>
    </>
  )
}

export default Card;