import React from "react";

const Choice = ({title, items, onChange}) => {

  const onChangeHandler = (id) => () => onChange(id);
  
    return (               
      <div className="sum__delivery">                  
        <h2>{title}</h2>
        <form>
          <ul>
            {items.map((item) => (
              <li onClick={onChangeHandler(item.id)}>
                <input type="radio" id={item.id}
                name="delivery" value="text"/>
                <label for={item.id}>{item.address}</label>
              </li>
            ))}
          </ul>
        </form>
      </div>
    )}

export default Choice;