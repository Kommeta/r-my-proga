import React, {useMemo, useState} from 'react';
import PostList from './components/PostList';
import './styles/App.css';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'JS', body: 'язык программирования, который позволяет вам создать динамически обновляемый контент, управляет мультимедиа, анимирует изображения'},
    {id: 2, title: 'CSS', body: 'формальный язык описания внешнего вида документа (веб-страницы)'},
    {id: 3, title: 'React', body: 'это JavaScript-библиотека для создания пользовательских интерфейсов'},
  ])

  const [filter, setFilter] = useState({sort:'', query: ''})

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
  }
  
  // получаем пост из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{margin: '15px 0'}} />

      <PostFilter 
        filter={filter} 
        setFilter={setFilter}
      />

      {sortedAndSearchedPosts.length 
        ? 
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов" />
        : 
        <h1 style={{textAlign: 'center'}}>
          Посты не найдены
        </h1>
      }
    </div>
  );
};

export default App;
