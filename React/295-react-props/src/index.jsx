import React from "react";
import ReactDOM from "react-dom";

function Card(props) {
  return (
    <div>
        <h2>{props.name}</h2>
      <img
        src={props.image}
        alt="avatar_img"
      />
      <p>{props.phoneNumber}</p>
      <p>{props.email}</p>
    </div>
  )
}

ReactDOM.render(
  <div>
    <h1>My Contacts</h1>
    <Card
      name= "Photo 1"
      image= "https://picsum.photos/200"
      phoneNumber= "1234567890"
      email= "golden@dog.com"
    />

    <Card
      name= "Photo 2"
      image= "https://picsum.photos/200/200"
      phoneNumber= "0987654321"
      email= "silver@dog.com"
    />

    <Card
      name= "Photo 3"
      image= "https://picsum.photos/201/201"
      phoneNumber= "1234567890"
      email= "brown@dog.com"
    />

  </div>,
  document.getElementById("root")
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
