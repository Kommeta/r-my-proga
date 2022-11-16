import React, {useMemo, useState} from 'react';
import PostList from './../components/PostList';
import './../styles/App.scss';
import PostForm from './../components/PostForm';
import PostFilter from './../components/PostFilter';
import MyModal from './../components/UI/MyModal/MyModal';
import MyButton from './../components/UI/button/MyButton'

export const Reviews = () => {

  const [posts, setPosts] = useState([
    {id: 1, title: 'Марина', body: 'Хорошие цены и уникальный товар. Могу рекомендовать покупки в данном магазине!'},
    {id: 2, title: 'Иванов А.', body: 'Отзывчивый персонал,быстрая отправка.'},
    {id: 3, title: 'Алексей М.', body: 'Очень оперативно приняли заказ и в тот же день передали в службу доставки. Покупкой доволен и рад, что открыл для себя новый магазин.'},
  ])

  const [filter, setFilter] = useState({sort:'', query: ''})
  const [modal, setModal] = useState(false);

  const sortedPosts = useMemo( () => {
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo( () => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }
  
  // получаем пост из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  return (
    <>
      <div className="App">
        <MyButton style={{marginTop: 50}} onClick={() => setModal(true)}>
          Оставить отзыв
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost} />
        </MyModal>
        
        <hr style={{margin: '15px 0'}} />

        <PostFilter 
          filter={filter} 
          setFilter={setFilter}
        />
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список отзывов" />
      </div>
    </>
  )
}