import React from "react";

const ButtonSmall = ({children, ...props}) => {
  return (
    <button {...props} style={{borderRadius: '6px', height: '38px', padding: '9px 12px', textTransform: 'uppercase'}}>
      {children}
    </button>
  )
}

export default ButtonSmall;