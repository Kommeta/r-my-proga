import React from "react";

const CounterCard = () => {

//const [valueItem, setValueItem] = useState(1);

// const formatValue = () => {
//   return valueItem === 0 ? "пусто" : valueItem;
// };

  // const handleIncrement = () => {
  //   setValueItem((prevState) => prevState + 1);
  // }
  
  // const handleDecrement = () => {
  //   setValueItem((prevState) => prevState - 1);
  // }

  return (
    <div className="counter-card">
      <button style={{borderRight: '1px solid rgb(239 239 239)'}}
              // onClick={handleDecrement}
      >
      -
      </button>
        
      <button style={{borderLeft: '1px solid rgb(239 239 239)'}}
              // onClick={handleIncrement}
      >
      +
      </button>
    </div>
  )
}

export default CounterCard;