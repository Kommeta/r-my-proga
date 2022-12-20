import React from "react";
import ButtonSmall from "./UI/button/ButtonSmall";

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
          <ButtonSmall className="btn-grey" onClick={() => props.remove(props.post)}>
            удалить
          </ButtonSmall>
        </div>
      </div>
    </div>
  )
}

export default PostItem;