import React from "react";
import Term from "./Term";
import emojipedia from "../emojipedia.js"

function createTerm(terms){
  return(
    <Term
      key={terms.id}
      emoji={terms.emoji}
      name={terms.name}
      meaning={terms.meaning}
    />
  )
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      
      <dl className="dictionary">
        {emojipedia.map(createTerm)}
      </dl>
    </div>
  );
}

export default App;
