import React, { useState } from "react";

const ButtonList = ({children, ...props}) => {

  const [openList, setOpenList] = useState(true);
  const onClickOpenList = () => {
    setOpenList(!openList)
  };

  return (
    <div onClick={onClickOpenList}>
      <button {...props}>
        {children}
        <img src="/images/icons/icon-down.png" alt="раскрыть список" width={12} height={10} 
          className={`sidebar ${!openList ? 'icon-down ' : '' }`}
          style={{marginLeft: '10px'}}/>
      </button>
    </div>
    
  )
}

export default ButtonList;