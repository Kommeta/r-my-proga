import React from "react";

const ButtonLink = ({children, ...props}) => {
  return (
    <button {...props} style={{borderRadius: '5px', padding: '4px 7px', textTransform: 'uppercase', fontSize: '12px', height: 'fit-content', border: 'none'}}>
      {children}
    </button>
  )
}

export default ButtonLink;