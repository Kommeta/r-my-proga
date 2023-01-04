import React, {useState} from "react";
import ButtonMain from './UI/button/ButtonMain';
import MyInput from './UI/input/MyInput';

const PostForm = ({create}) => {
  const [post, setPost] = useState({title:'', body:''})

  const addNewPost = (e) => {
    e.preventDefault()
    
    const newPost = {
      ...post, id: Date.now()
    }
    create(newPost)
    setPost({title:'', body:''})
  }

  return (
    <div>
      <form>
        {/* управляемый компонент */}
        <MyInput 
            value={post.title}
            onChange={e => setPost({...post, title: e.target.value})}
            type="text" 
            placeholder='Ваше имя' />
        <MyInput 
            value={post.body}
            onChange={e => setPost({...post, body: e.target.value})}
            type="text" 
            placeholder='Ваш отзыв' />

        <ButtonMain
          className="btn btn-sm btn-outline-cloud"
          onClick={addNewPost} 
        >
          Создать
        </ButtonMain>
      </form>
    </div>
  )
}

export default PostForm;