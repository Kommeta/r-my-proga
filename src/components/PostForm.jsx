import React, {useState} from "react";
import MyButton from './UI/button/MyButton';
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

        <MyButton onClick={addNewPost} >Создать</MyButton>
      </form>
    </div>
  )
}

export default PostForm;