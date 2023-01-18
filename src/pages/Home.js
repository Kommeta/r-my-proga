import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Basket from "../components/Basket";
import SelectPrice from "../components/UI/select/SelectPrice";
import MyInput from "../components/UI/input/MyInput";
import axios from "axios";
import '../styles/Loading.scss'


export const Home = () => {

  const API_URL = 'http://127.0.0.1:8000/api/v1/main';
  const BASE_API_URL = 'http://127.0.0.1:8000';

  const [isLoading, setIsLoading] = useState(true);
  // каталог товаров
  const [cards, setCards] = useState([]);

  // товары в корзине 
  const [cardItems, setCardItems] = useState([]);

  async function fetchCardItem() {
    try {
      const res = await axios.get(`${API_URL}${/basket/}`, 
      {
        headers:
          {Authorization: `Token ${localStorage.getItem('token')}`}
      }).then((res) => {
        let cardBasket = res.data.item;
        cardBasket.map(i => {
          if (i.imageUrl) {
            i.imageUrl = `${BASE_API_URL}${i.imageUrl}`
          }
        })
        setCardItems(cardBasket);
      })
    } catch(e) {
        if (e.response.statusText == 'Unauthorized') {
          console.log('Для совершения покупок необходимо авторизоваться!')
        } 
        console.log(e.response)
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

    axios.get(`${API_URL}${/phone\phone/}`)
      .then((res) => {
        setCards(res.data);
        setIsLoading(false)
      })

    fetchCardItem()

  }, [setCardItems]);

  const onAddToBasket = async (id) => {
    try {
      const res = axios.patch(`${API_URL}${/basket/}`, 
        {
          item: id
        },
        {
          headers: {Authorization: `Token ${localStorage.getItem('token')}`}
        }
      )
      .then((res) => {
        let addCardBasket = res.data.item;
        addCardBasket.map(i => {
          if (i.imageUrl) {
            i.imageUrl = `${BASE_API_URL}${i.imageUrl}`
          }
        })
        setCardItems(addCardBasket);
      })
    } catch(e) {
      console.log(e);
  }
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
    axios.put(`${API_URL}${/basket/}`,
    {
      item: id
    },
    {
      headers: {Authorization: `Token ${localStorage.getItem('token')}`}
    }
    ).then((res) => {
      let removeCardBasket = res.data.item;
      removeCardBasket.map(i => {
        if (i.imageUrl) {
          i.imageUrl = `${BASE_API_URL}${i.imageUrl}`
        }
      })
      setCardItems(removeCardBasket);
    })
  }

  const priceBasket = cardItems.reduce((sum, obj) => (+obj.price) + sum, 0);
  
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

      { isLoading ? 
        <div class="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        
        :

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
      }

      <Basket 
              cardsList={cardItems} 
              onRemove={onRemoveItemBasket}
              priceBasket={priceBasket}
      />   
    </>
  )
}