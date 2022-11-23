import React from "react";
import { useState } from "react";
import Card from "../components/Card";
import Basket from "../components/Basket";
import SelectPrice from "../components/UI/select/SelectPrice";
import MyInput from "../components/UI/input/MyInput";
import { useEffect } from "react";


export const Home = ({addPlus}) => {

  // каталог товаров
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/cards')
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      setCards(json);
    });
  }, []);


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
  }

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