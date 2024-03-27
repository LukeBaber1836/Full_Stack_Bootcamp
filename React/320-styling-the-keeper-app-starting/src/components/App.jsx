import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  
  const [noteContent, setNoteContent] = useState([]);

  function addNote(newContent){
    setNoteContent(prevNotes => {
      return [ ...prevNotes, newContent];
    });
  }

  function deleteItem(id){
    setNoteContent(prevNotes =>{
      return (prevNotes.filter(
        (item, index) => {
          return (index !== id) // Do not return item with matching id (delete item)
        }
      ))}
    )
  }

  return (
    <div>
      <Header/>
      <CreateArea addNote={addNote}/>
      {noteContent.map((noteText, index) => (
        <Note
          key={index}
          id={index}
          title={noteText.title}
          content={noteText.content}
          onDelete={deleteItem}
        />
      ))}

      <Footer/>
    </div>
  );
}

export default App;
