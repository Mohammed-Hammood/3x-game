import  Navbar  from "./components/navbar";
import Home from './components/home';
import './styles/main.scss';
import { useState } from "react";
import {getBoxes} from './components/local-storage';

function App() {
  const [count, setCount] = useState(0);
 
  return (<>
      <Navbar setCount={setCount} />
        <Home setCount={setCount} count={count} />
      </>);
}

export default App;
