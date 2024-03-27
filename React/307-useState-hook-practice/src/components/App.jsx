import React, { useState } from "react";

function App() {
  setInterval(getTime, 1000);

  const time = new Date().toLocaleTimeString();
  const [now, newTime] = useState(time);  // React useState hook

  function getTime(){
    const newDate = new Date().toLocaleTimeString();
    newTime(newDate);
  }

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={getTime}>Get Time</button>
    </div>
  );
}

export default App;
