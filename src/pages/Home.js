import React from "react";
import { useState } from "react";
import Card from "../components/Card";
import Basket from "../components/Basket";

export const Home = () => {

  const [cards, setCards] = useState([
    { id: 1,
      title: 'Nokia 3310 - двухдиапазонный сотовый телефон; с монохромным жидкокристаллическим дисплеем, поддерживающим разрешение 84 на 48 пикселей',
      price: 88.99,
      imageUrl: require('../images/nokia.webp')
    },
    { id: 2,
      title: 'Siemens ME45 – стильный телефон, обладающий влаго- и пылезащитным корпусом. Поддержка WAP 1.2.1 и GPRS',
      price: 99.0,
      imageUrl: require('../images/siemens.webp')
    },
    { id: 3,
      title: 'Nokia 8800 Sirocco Edition, работающий на платформе Series 40 3rd Edition, Feature Pack 1, оснащенный TFT дисплеем, отображающим до 262 тыс. цветов и камерой на 2 Mp',
      price: 50.0,
      imageUrl: require('../images/nokia88.webp')
    }
  ]);
  console.log(setCards);

  const [cardItems, setCardItems] = useState([]);
  
  const onAddToBasket = (obj) => {
    setCardItems(prev =>[ ...prev , obj]);
  }

const onRemoveItemBasket = (imageUrl) => {
  setCardItems((prev) => prev.filter(cards => cards.imageUrl !== imageUrl));
}
const priceBasket = cardItems.reduce((sum, obj) => obj.price + sum, 0);


  return (
    <>
      <h1>Каталог товаров</h1>
      <div className="cards-wrapper">
        {cards.map((card) => (
          <Card 
            key={card.id}
            title={card.title}
            price={card.price}
            imageUrl={card.imageUrl}
            onPlus={(obj) => onAddToBasket(obj)} />
        ))}        
      </div>
      <Basket cards={cardItems} onRemove={onRemoveItemBasket} priceBasket={priceBasket}
      />     
    </>
  )
}