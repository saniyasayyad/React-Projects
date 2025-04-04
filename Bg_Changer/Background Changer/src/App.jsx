import { useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("olive"); // State is defined but never changes

  return (
    <div className="w-screen h-screen duration-200"
      style={{ backgroundColor: color }}
    >
 
    <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
    <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
    <button
    onClick={() => setColor("red")}
    className="outline-none px-4"
    style={{backgroundColor: "red"}}
    >Red</button>

<button
onClick={() => setColor("green")}
    className="outline-none px-4"
    style={{backgroundColor: "green"}}
    >Green</button>


<button
  onClick={() => setColor("blue")}
    className="outline-none px-4"
    style={{backgroundColor: "blue"}}
    >Blue</button>

<button
  onClick={() => setColor("olive")}
    className="outline-none px-4"
    style={{backgroundColor: "olive"}}
    >Olive</button>

<button
  onClick={() => setColor("Gray")}
    className="outline-none px-4"
    style={{backgroundColor: "Gray"}}
    >Gray</button>

<button
  onClick={() => setColor("Yellow")}
    className="outline-none px-4"
    style={{backgroundColor: "Yellow"}}
    >Yellow</button>

<button
  onClick={() => setColor("Pink")}
    className="outline-none px-4"
    style={{backgroundColor: "Pink"}}
    >Pink</button>

<button
  onClick={() => setColor("Purple")}
    className="outline-none px-4"
    style={{backgroundColor: "Purple"}}
    >Purple</button>

<button
  onClick={() => setColor("black")}
    className="outline-none px-4"
    style={{backgroundColor: "black"}}
    >Black</button>




    </div>

    </div>

    </div>
  );
}

export default App;
