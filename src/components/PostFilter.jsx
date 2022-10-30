import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import classes from "./../styles/App.css"

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
      <div>
        <MyInput           
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
          placeholder="Поиск"
        />
        <div className={classes.sortBlock}>
          <p>Сортировать по</p>
          <MySelect
            value={filter.sort}
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultValue="Сортировка"
            option={[
              {value: 'title', name: 'названию'},
              {value: 'body', name: 'описанию'}
            ]}
          />
        </div>
        
      </div>

    </div>
  );
};

export default PostFilter;