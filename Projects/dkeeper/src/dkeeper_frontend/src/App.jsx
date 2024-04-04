import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import { dkeeper_backend } from "../../declarations/dkeeper_backend";
import { v4 as uuidv4 } from 'uuid';

function App() {
  
  const [noteContent, setNoteContent] = useState([]);

  function addNote(newContent){
    setNoteContent(prevNotes => {
      dkeeper_backend.createNote(newContent.title, newContent.content);
      console.log(noteContent);
      return [newContent, ...prevNotes];
    });
  }

  useEffect(() => {
    fetchData();
  },[]); // Empty array makes sure useEffect only runs once on page refresh

  async function fetchData(){
    console.log("Page loaded");
    const notesArray = await dkeeper_backend.readNotes();
    setNoteContent(notesArray);
  }

  function deleteItem(id){
    dkeeper_backend.removeNote(id);
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
