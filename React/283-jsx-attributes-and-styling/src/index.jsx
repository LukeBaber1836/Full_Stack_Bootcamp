import React from "react";
import ReactDOM from "react-dom";

const img = 'https://picsum.photos/100/100';

ReactDOM.render(
  <div>
    <h1 className="heading" contentEditable="true" spellCheck="false">My Favourite Foods</h1>
    <ul>
      <img className="dog-img" src="https://www.thesprucepets.com/thmb/hxWjs7evF2hP1Fb1c1HAvRi_Rw0=/2765x0/filters:no_upscale():strip_icc()/chinese-dog-breeds-4797219-hero-2a1e9c5ed2c54d00aef75b05c5db399c.jpg"></img>
      <img className="dog-img" src="https://thumbs.dreamstime.com/b/beagle-dog-isolated-white-background-purebred-103538194.jpg"></img>
      <img className="dog-img" src="https://www.southernliving.com/thmb/9E2guP65DZP_ZnUP13pcVG8Sfmc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1285438779-2000-9ea25aa777df42e6a046b10d52b286b7.jpg"></img>
      <img src={img + "?grayscale"}/>
    </ul>
  </div>,
  document.getElementById("root")
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
