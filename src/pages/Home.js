import React from "react";
import { useState } from "react";
import Card from "../components/Card";
import Basket from "../components/Basket";

export const Home = () => {

  const [cards, setCards] = useState([
    { id: 1,
      title: 'Nokia 3310 - двухдиапазонный сотовый телефон; с монохромным жидкокристаллическим дисплеем, поддерживающим разрешение 84 на 48 пикселей',
      prace: 88.99,
      imageUrl: require('../images/nokia.webp')
    },
    { id: 2,
      title: 'Siemens ME45 – стильный телефон, обладающий влаго- и пылезащитным корпусом. Поддержка WAP 1.2.1 и GPRS',
      prace: 99.0,
      imageUrl: require('../images/siemens.webp')},
    { id: 3,
      title: 'Nokia 8800 Sirocco Edition, работающий на платформе Series 40 3rd Edition, Feature Pack 1, оснащенный TFT дисплеем, отображающим до 262 тыс. цветов и камерой на 2 Mp',
      prace: 50.0,
      imageUrl: require('../images/nokia88.webp')}
  ]);// eslint-disable-next-line

  //const [cardItems, setCardItems] = useState()

  return (
    <>
      <h1>Каталог товаров</h1>
      <div className="cards-wrapper">
        {cards.map(card => 
          <Card card={card} key={card.id}/>
        )}        
      </div>
      <Basket/>     
    </>
  )
}