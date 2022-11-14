import React from "react";

const Basket = () => {

  return (
    <>
      <div style={{margin: '130px auto 0 auto', paddingTop: '30px', width: '940', borderTop:  '1px solid #000'}}>
        <h1>Корзина</h1>
        <div className="cards-wrapper">
            
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
      </div>
    </>
  )}

  export default Basket;