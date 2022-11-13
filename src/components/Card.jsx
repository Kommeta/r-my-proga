import React, {useState} from "react";

function Card(props) {

  const [isAdded, setIsAdded] = useState();

  const onClickPlus = () => {
    setIsAdded(true)
  };

  return (
    <>
    <div className="card">
          <img 
          src={props.imageUrl}
          width={150}
          alt="" />
          <p className="card-description">
            {props.title}
          </p>
          <div className="card-price">
            <span>Цена:</span>
            <b>{props.price} руб.</b>
            <button 
              className={`sidebar ${isAdded ? 'btn__basket-delete' : 'btn__add' }`}
              onClick={onClickPlus}
              type="button"
              >
                {isAdded ? 'удалить' : 'в корзину' }              
            </button>
          </div>
        </div>
    </>
  )
}

export default Card;