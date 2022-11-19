import React, { useMemo } from "react";
import { useState } from "react";
import Card from "../components/Card";
import Basket from "../components/Basket";

export const Home = ({addPlus}) => {

  const cards = useMemo(() => [
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
    },
    { id: 4,
      title: 'Nokia 1100 /GSM /экран 96x65',
      price: 0,
      imageUrl: require('../images/nokia-1100.webp')
    },
  ], []);

  const [cardItems, setCardItems] = useState([]);
  
  const onAddToBasket = (obj) => {
    if (obj.price > 0) {
      setCardItems(prev =>[ ...prev , obj]);
    } else {
      alert('в данный момент товар не доступен к заказу');
      addPlus();
    }
  }

  const onRemoveItemBasket = (imageUrl) => {
    setCardItems((prev) => prev.filter(cards => cards.imageUrl !== imageUrl));
    console.log('onRemoveItemBasket');
  }
  
//  const listCards = cards.filter(e => e.imageUrl);

  // const backPlusBtn = (imageUrl) => {
  //   if (listCards.find(listCards => listCards.imageUrl == imageUrl)) {
  //     console.log('img=img');
  //     //addPlus();
  //   } else {
  //     console.log('ne rabotaet');
  //   }
  //   console.log('finish');
  // }

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
            onPlus={(obj) => onAddToBasket(obj)}
          />
        ))}        
      </div>
      <Basket cards={cardItems} 
              onRemove={onRemoveItemBasket}
              priceBasket={priceBasket}
      />     
    </>
  )
}