import React from "react";
import { useState } from "react";
import Card from "../components/Card";
import Basket from "../components/Basket";
import SelectPrice from "../components/UI/select/SelectPrice";
import MyInput from "../components/UI/input/MyInput";

export const Home = ({addPlus}) => {

  // каталог товаров
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
    },
    { id: 4,
      title: 'Nokia 1100 /GSM /экран 96x65',
      price: 0,
      imageUrl: require('../images/nokia-1100.webp')
    },
  ]);
  // товары в корзине 
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
  //  сортировка по цене
  const [selectedSort, setSelectedSort] = useState('');

  const sortCards = (sort) => {
    setSelectedSort(sort);
    setCards([...cards].sort((a,b) => a.price[sort] > b.price[sort] ? 1 : -1))
  }
  // данные в поисковике
  const [searchQueryCard, setSearchQuery] = useState('');

  const filteredCards = cards.filter(card => {
    return card.title.toLowerCase().includes(searchQueryCard.toLowerCase())
  })

  return (
    <>
      <h1>Каталог товаров</h1>

      <div className="sorting-block">
        <MyInput
          placeholder="Поиск ..."
          value={searchQueryCard}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <SelectPrice
          value={selectedSort}
          onChange={sortCards}
          defaultValue="Сортировка"
          options={[
            {value: 'lowPrice', title: 'Сначала дешевые'},
            {value: 'highPrice', title: 'Сначала дорогие'}
          ]}
        />
      </div>

      <div className="cards-wrapper">
        {filteredCards.map((card) => (
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