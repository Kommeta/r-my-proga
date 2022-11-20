import React from "react";
import classes from './MySelect.module.scss'

const SelectPrice = ({options, defaultValue, value, onChange}) => {
  return (
    <>
      <select
        className={classes.mySelect}
        value={value}
        onChange={event => onChange(event.target.value)}
      >
        <option disabled value="">{defaultValue}</option>
        {options.map(option => 
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        )}
      </select>
    </>
  );
};

export default SelectPrice;