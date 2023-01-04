import React from "react";
import ButtonMain from "./UI/button/ButtonMain";

const PostItem = (props) => {
  return (
    <div>
      <div className="post">
        <div className="post__content">
          <strong>{props.number}. {props.post.title}</strong>
          <div className="">
            {props.post.body}
          </div>
        </div>        
        <div className="post__btns">
          <ButtonMain className="btn btn-sm btn-outline-cloud" onClick={() => props.remove(props.post)}>
            удалить
          </ButtonMain>
        </div>
      </div>
    </div>
  )
}

export default PostItem;