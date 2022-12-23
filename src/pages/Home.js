import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Basket from "../components/Basket";
import SelectPrice from "../components/UI/select/SelectPrice";
import MyInput from "../components/UI/input/MyInput";
import axios from "axios";


export const Home = () => {

  // каталог товаров
  const [cards, setCards] = useState([]);

  // товары в корзине 
  const [cardItems, setCardItems] = useState([]);

  async function fetchCardItem() {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/v1/main/basket/', 
      {
        headers:
          {Authorization: `Token ${localStorage.getItem('token')}`}
      }).then((res) => {
        let cardBasket = res.data.item;
        cardBasket.map(i => {
          if (i.imageUrl) {
            i.imageUrl = `http://127.0.0.1:8000${i.imageUrl}`
          }
        })
        setCardItems(cardBasket);
      })
    } catch(e) {
        console.log(e);
    }
  }

  useEffect(() => {
    // fetch('http://localhost:3000/cards')
    // .then((res) => {
    //   return res.json();
    // })
    // .then((json) => {
    //   setCards(json);
    // });

    axios.get('http://127.0.0.1:8000/api/v1/main/phone/phone/').then((res) => {
      setCards(res.data);
    })

    fetchCardItem()

  }, [setCardItems]);

  const onAddToBasket = async (id) => {
    const res = axios.patch('http://127.0.0.1:8000/api/v1/main/basket/', 
      {
        item: id
      },
      {
        headers: {Authorization: `Token ${localStorage.getItem('token')}`}
      }
    ).then((res) => {
      setCardItems(res.data.item);
    })
  }
  
  // const onAddToBasket = (obj) => {
  //   if (obj.price > 0) {
  //     axios.post('http://127.0.0.1:1000/api/v1/main/basket/', obj)
  //     setCardItems((prev) => [ ...prev , obj]);
  //     console.log(obj);
  //   } else {
  //     alert('в данный момент товар не доступен к заказу');
  //     // to do костыль с кнопкой добавления товара
  //     //addPlus();
  //   }
  // }
  const onRemoveItemBasket = (id) => {
    axios.put(`http://127.0.0.1:8000/api/v1/main/basket/`,
    {
      item: id
    },
    {
      headers: {Authorization: `Token ${localStorage.getItem('token')}`}
    }
    ).then((res) => {
      setCardItems(res.data.item);
    })
  }

  const priceBasket = cardItems.reduce((sum, obj) => obj.price + sum, 0);
  //  сортировка по цене
  const [selectedSort, setSelectedSort] = useState('');

  // to do значение кода: 
  // функция может вернуть 0, 1 или -1, в зависимости от возвр. значения метод sort сделает свой выбор
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
            item={card.id}
            key={card.id}
            amount={card.amount}
            title={card.title}
            price={card.price}
            imageUrl={card.imageUrl}
            onPlus={(item) => onAddToBasket(item)}
          />
        ))}        
      </div>
      <div>

      </div>
      <Basket 
              cardsList={cardItems} 
              onRemove={onRemoveItemBasket}
              priceBasket={priceBasket}
      />     
    </>
  )
}