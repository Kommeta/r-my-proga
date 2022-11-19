import React, { useMemo } from "react";
import { useState } from "react";
import Choice from "./Choice";


const Basket = ({cards = [], onRemove, priceBasket}) => {

  const [delivery, setDelivery] = useState();
  const [discount, setDiscount] = useState();

  const choices = useMemo( () => [
    {
      title: 'Доставка товара:',
      items: [
        {
          id: 'Choice1',
          address: 'по г.Минска'
        },
        {
          id: 'Choice2',
          address: 'за пределы г.Минска'
        }
      ],
      onChange: (id) => setDelivery(id)
    },
    {
      title: 'Ваша скидка на выбор:',
      items: [
        {
          id: 'Choice3',
          address: 'скидка 10 руб от суммы товара'
        },
        {
          id: 'Choice4',
          address: 'скидка 3 % при покупке товаров стоимомтью свыше 100 руб.'
        },
        {
          id: 'Choice5',
          address: 'дополнительный товара к заказу, стоимостью до 15 руб.'
        }
      ],
      onChange: (id) => setDiscount(id)
    }
  ], [])

  const discountValue = useMemo(() => {
    let value = 0;
    // TO DO проверить по чистому коду
    if (discount === 'Choice3') {
      value = 10;
    } else if (priceBasket > 100 && discount === 'Choice4') {
      value = priceBasket * 0.03;
    }
    return value;
  }, [discount, priceBasket])

  const priceTotal = useMemo(() => {
    const deliveryPrice = delivery === 'Choice2' ? 5 : 0
    return (priceBasket - discountValue + deliveryPrice).toFixed(2);
  }, [delivery, discountValue, priceBasket])

  return (
    <>
      <div style={{margin: '130px auto 0 auto', paddingTop: '40px', width: '940', borderTop:  '1px solid #000'}}>
        <h1>Ваш заказ</h1>

        {
          cards.length > 0 ? 
            <div>

              <div className="cards-wrapper__basket">
                {
                cards.map((obj) => (                
                  <div className="card" style={{marginRight: '15px'}}>
                    <img 
                      src={obj.imageUrl}
                      width={80} alt="" />
                    <p className="card-description">
                      {obj.title}
                    </p>
                    <div className="card-price">
                      <span>Цена:</span>
                      <b>{obj.price} руб.</b>
                      <button className='btn__basket-delete'type="button" 
                              onClick={() => onRemove(obj.imageUrl)}>
                        удалить             
                      </button>
                    </div>
                  </div>
                ))}                
              </div>

              <div className="block-sum">

                {
                  choices.map((value) => <Choice {...value} />)
                }

                <div className="sum__total">
                  Итого к оплате: 
                  <span> {priceTotal} </span> руб
                </div>
              </div>
          
              <div>
                <button className="btn__basket-buy" type="button">
                  Оформить заказ
                </button>
              </div>
            </div>
            
            : 
            
            <div className="basket-title">
              Ваша корзина пуста :(
            </div>
        }

      </div>
    </>
  )}

  export default Basket;