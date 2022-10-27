import React, {useState} from 'react';
import PostList from './components/PostList';
import './styles/App.css';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'JS', body: 'язык программирования, который позволяет вам создать динамически обновляемый контент, управляет мультимедиа, анимирует изображения'},
    {id: 2, title: 'CSS', body: 'формальный язык описания внешнего вида документа (веб-страницы)'},
    {id: 3, title: 'React', body: 'это JavaScript-библиотека для создания пользовательских интерфейсов'},
  ])

  // реализовываем двухстороннее связывание
  const [selectedSort, setSelectedSort] = useState('')

  // делаем селект управляемым
  const [searchQuery, setSearchQuery] = useState('')
  
  // проверка, если селект не пуст, то будет возвращ-ся отсортированный массив, иначе возвр. обычный массив потов
  function getSortedPosts() {
    if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts;
  }

  // для того чтобы сделать поиск, необходимо сделать фильтрацию, удалить не нужные элементы из массива
  const sortedPosts = getSortedPosts()

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }
  
  // получаем пост из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{margin: '15px 0'}} />

      <div>
        <MySelect           
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Поиск"
        />

        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка"
          option={[
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'}
          ]}
        />
      </div>

      {posts.length 
        ? 
        <PostList remove={removePost} posts={sortedPosts} title="Список постов" />
        : 
        <h1 style={{textAlign: 'center'}}>
          Посты не найдены
        </h1>
      }
      </div>
  );
}

export default App;
