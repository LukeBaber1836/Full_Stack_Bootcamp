import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";


function CreateArea(props) {
  // onClick={() => { props.addNote }} function is called only when div is clicked
  const [inputItems, setInputItems] = useState({
    title: "",
    content: "",
  });

  // Handles hover actions with entry title
  const [isExpanded, setExpanded] = useState(false);
  
  function expand(){
    setExpanded(true);
  }

  function close(){
    setExpanded(false);
  }

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
    <div className="create-area" onMouseLeave={close}>
      <form className="create-note">
        {isExpanded ? 
        <input
          name="title" 
          onChange={handleChange}
          placeholder="Title" 
          value={inputItems.title}
        /> : null}
        
        <textarea
          onClick={expand}
          name="content" 
          onChange={handleChange}
          placeholder="Take a note..." 
          rows={isExpanded ? 3 : 1}
          value={inputItems.content}
        />

        <Zoom in={isExpanded}>
          <Fab
            onClick={() => { 
              props.addNote(inputItems);
              setInputItems({title: "", content:""}); // Reset to default values for new entry
            }}
            type="button">
            <AddIcon/>
          </Fab>
        </Zoom>
        
      </form>
    </div>
  );
}

export default CreateArea;
