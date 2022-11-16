import React, {useState} from "react";

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
        width={120}
        alt="" />
        <p className="card-description">
          {title}
        </p>
        <div className="card-price">
          <span>Цена:</span>
          <b>{price} руб.</b>
          <button 
            className={`sidebar ${isAdded ? 'btn__basket-delete' : 'btn__add' }`}
            onClick={onClickPlus}
            type="button"
            >
              {isAdded ? 'добавлен' : 'в корзину' }              
          </button>
        </div>
      </div>
    </>
  )
}

export default Card;