import React, {useState} from "react";

const Card = (props) => {

  const [isAdded, setIsAdded] = useState();

  const onClickPlus = () => {
    setIsAdded(!isAdded)
  };

  return (
    <>
    <div className="card">
          <img 
          src={props.card.imageUrl}
          width={150}
          alt="" />
          <p className="card-description">
            {props.card.title}
          </p>
          <div className="card-price">
            <span>Цена:</span>
            <b>{props.card.prace} руб.</b>
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