import React from "react";
import Login from "./Login";


var isLoggedIn = false;
// Using ternary opperator instead of traditional if/else
function App() {
  return (
    <div className="container">{
      isLoggedIn ? <h1>Hello Dude!</h1> : <Login/>
    }</div>
  );
}

export default App;
