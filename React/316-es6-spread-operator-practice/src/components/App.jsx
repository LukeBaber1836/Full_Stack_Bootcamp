import React, { useState } from "react";
import Item from "./Item";

function App() {
  const [content, setContent] = useState("");
  const [items, setItems] = useState([]);

  function handleSubmit(){
    setItems(prevItems => {
      return [...prevItems, content]
    })
    console.log(items);
  }

  function handleChange(event){
    setContent(event.target.value);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={content}/>
        <button onClick={handleSubmit}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
        {items.map((todoItem, i) => (
          <Item 
            key={i} 
            text={todoItem}
          />
        ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
