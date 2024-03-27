import React, { useState } from "react";

function CreateArea(props) {
  // onClick={() => { props.addNote }} function is called only when div is clicked
  const [inputItems, setInputItems] = useState({
    title: "",
    content: "",
  });

  function handleChange(event){
    const { name, value } = event.target;
    setInputItems(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  return (
    <div>
      <form>
        <input 
          name="title" 
          onChange={handleChange}
          placeholder="Title" 
          value={inputItems.title}
        />
        <textarea 
          name="content" 
          onChange={handleChange}
          placeholder="Take a note..." 
          rows="3" 
          value={inputItems.content}
        />
        <button
          onClick={() => { 
            props.addNote(inputItems);
            setInputItems({title: "", content:""}); // Reset to default values for new entry
          }}
          type="button">Add
        </button>
        
      </form>
    </div>
  );
}

export default CreateArea;
