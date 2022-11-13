import React from "react";
import Nokia from "./../images/nokia.webp"

export const Basket = () => {
  return (
    <>
      <h1>Корзина</h1>
      <div className="cards-wrapper">
        <div className="card">
          <img 
          src={Nokia}
          width="150"
          alt="" />
          <p className="card-description">Nokia 3310 - двухдиапазонный сотовый телефон;
          с монохромным жидкокристаллическим дисплеем, поддерживающим разрешение 84 на 48 пикселей
          </p>
          <div className="card-price">
            <span>Цена:</span>
            <b>88.99 руб.</b>
            <button className="btn__basket-delete" type="button">удалить</button>
          </div>
        </div>
      </div>
      <div className="block-sum">
        <div className="sum__delivery">
          <h2>Доставка товара:</h2>
          <ul>
            <li>в пределах г.Минска</li>
            <li>за пределы г.Минска</li>
          </ul>
        </div>
        <div className="sum__reduction">
          <h2>Ваша скидка на выбор:</h2>
          <ul>
            <li> скидка 10 руб от суммы товара</li>
            <li> скидка 3 % при покупке товаров стоимомтью свыше 100 руб.</li>
            <li> дополнительный товара к заказу, стоимостью до 15 руб.</li>
          </ul>
        </div>
        <div className="sum__total">
          Итого к оплате: 
          <span> 0 руб</span>
        </div>
      </div>
      <div>
        <button className="btn__basket-buy" type="button">
          Оформить заказ
        </button>
      </div>
    </>
  )
}