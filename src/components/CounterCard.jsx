import React, {useState} from "react";

const CounterCard = () => {

  const [counterItem, setCounterItem] = useState(1);

  const handleIncrement = () => {
    setCounterItem((prevState) => prevState + 1);
  }
  
  const handleDecrement = () => {
    setCounterItem((prevState) => prevState - 1);
  }

  return (
    <div className="counter-card">
      <button style={{borderRight: '1px solid rgb(239 239 239)'}}
              onClick={handleDecrement}
      >
      -
      </button>
        {counterItem}
      <button style={{borderLeft: '1px solid rgb(239 239 239)'}}
              onClick={handleIncrement}
      >
      +
      </button>
    </div>
  )
}

export default CounterCard;