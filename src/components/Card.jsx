import React, {useState} from "react";
import ButtonMain from "./UI/button/ButtonMain";

const Card = ({imageUrl, title, price, amount, item, onPlus}) => {

  const [isAdded, setIsAdded] = useState();

  const onClickPlus = () => {
    onPlus(item);
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
        <div className="card-price" style={{marginBottom: '15px'}}>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>  
        <ButtonMain 
          className={`sidebar ${isAdded ? 'btn btn-disabled ' : 'btn btn-fiolet' }`}
          onClick={onClickPlus}
          >
            {isAdded ? 'добавлен' : 'в корзину' }              
        </ButtonMain>
      </div>
    </>
  )
}

export default Card;