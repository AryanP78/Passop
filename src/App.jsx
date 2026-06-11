import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Navbar from "./comoonents/Navbar";
import Manager from "./comoonents/Manager";

function App() {
  return (
    <>
      <Navbar />
      <Manager />
    </>
  );
}

export default App;
