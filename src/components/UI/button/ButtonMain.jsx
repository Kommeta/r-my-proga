import React from "react";

const ButtonMain = ({children, ...props}) => {
  return (
    <button {...props}>
      {children}
    </button>
  )
}

export default ButtonMain;