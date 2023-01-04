import React, { useMemo } from "react";
import { useState } from "react";
import Choice from "./Choice";
import ButtonMain from "./UI/button/ButtonMain";


const Basket = ({cardsList = [], onRemove, priceBasket}) => {

  const [delivery, setDelivery] = useState();
  const [discount, setDiscount] = useState();

  const choices = useMemo( () => [
    {
      id: 'delivery',
      title: 'Доставка товара:',
      items: [
        {
          id: 'choice-city',
          address: 'по г.Минска'
        },
        {
          id: 'choice-out-city',
          address: 'за пределы г.Минска'
        }
      ],
      onChange: (id) => setDelivery(id)
    },
    {
      id: 'discount',
      title: 'Ваша скидка на выбор:',
      items: [
        {
          id: 'choice-discount1',
          address: 'скидка 10 руб от суммы товара'
        },
        {
          id: 'choice-discount2',
          address: 'скидка 3 % при покупке товаров стоимомтью свыше 100 руб.'
        },
        {
          id: 'choice-discount3',
          address: 'дополнительный товара к заказу, стоимостью до 15 руб.'
        }
      ],
      onChange: (id) => setDiscount(id)
    }
  ], [])

  const discountValue = useMemo(() => {
    let value = 0;
    // TO DO проверить по чистому коду
    if (discount === 'choice-discount1') {
      value = 10;
    } else if (priceBasket > 100 && discount === 'choice-discount2') {
      value = priceBasket * 0.03;
    }
    return value;
  }, [discount, priceBasket])

  const priceTotalBasket = useMemo(() => {
    const deliveryPrice = delivery === 'choice-out-city' ? 5 : 0
    return (priceBasket - discountValue + deliveryPrice).toFixed(2);
  }, [delivery, discountValue, priceBasket])

    //let quantityProduct = cardsList.find(item => item.amount !== 0).amount;
    
    let value = 1;
    const [valueItem, setValueItem] = useState(value);

    const handleIncrement = () => {
    setValueItem((prevState) => prevState + 1);
  }
  
  const handleDecrement = () => {
    setValueItem((prevState) => prevState - 1);
  }

  return (
    <>
      <div style={{margin: '130px auto 0 auto', paddingTop: '40px', width: '940', borderTop:  '1px solid #000'}}>
        <h1>Ваш заказ</h1>

        {
          cardsList.length > 0 ? 
            <div>

              <div className="cards-wrapper__basket">
                {
                cardsList.map((obj) => (                
                  <div key={obj.id} className="card card-basket" style={{marginRight: '10px'}}>
                    <img 
                      src={obj.imageUrl}
                      width={80} height={100} alt="" 
                    />
                    <div style={{marginLeft: '10px'}}>
                      <p className="card-description">
                        {obj.title}
                      </p>
                      <div className="card-price">
                        <span>Цена:</span>
                        <b>{obj.price} руб.</b>
                        <ButtonMain
                          style={{marginTop: '15px'}}
                          className='btn btn-sm btn-outline-cloud'
                          onClick={() => onRemove(obj.id)}> 
                        удалить из корзины
                        </ButtonMain>

                        <div className="counter-card">
                          <button style={{borderRight: '1px solid rgb(239 239 239)'}}
                                  onClick={handleDecrement}
                          >
                          -
                          </button>
                            {valueItem}
                          <button style={{borderLeft: '1px solid rgb(239 239 239)'}}
                                  onClick={handleIncrement}
                          >
                          +
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}                
              </div>

              <div className="block-sum">

                {
                  choices.map((value) => (
                    <Choice 
                    key={value.id}
                      {...value} 
                    />
                  ))
                } 

                <div className="sum__total">
                  Итого к оплате: 
                  <span> {priceTotalBasket} </span> руб
                </div>
              </div>
          
              <div>
                <button className="btn btn-sun" type="button">
                  Оформить заказ
                </button>
              </div>
            </div>
            
            : 
            
            <div className="basket-title">
              Ваша корзина пуста 
            </div>
        }

      </div>
    </>
  )}

  export default Basket;