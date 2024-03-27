import React, { useState } from "react";


function App() {
  const [headingText, setHeadingText] = useState("");
  const [mouseOver, setMouseOver] = useState(false);
  const [name, setName] = useState("");

  function handleClick(event){
    setHeadingText(name)
    event.preventDefault();
  }

  function handleMouseOver(){
    setMouseOver(true);
  }
  function handleMouseOut(){
    setMouseOver(false);
  }

  function handleChange(event){
    console.log(event.target.value);
    setName(event.target.value);
  }

  return (
    <div className="container">
      <h1>Hello {headingText}</h1>
      <form onSubmit={handleClick}>
        <input type="text" onChange={handleChange} placeholder="What's your name?" />
        <button 
          type="submit"
          style={{backgroundColor: mouseOver ? "black" : "white"}} 
          onMouseOver={handleMouseOver} 
          onMouseOut={handleMouseOut}>
          Submit
        </button>
      </form>
      
      
    </div>
  );
}

export default App;
