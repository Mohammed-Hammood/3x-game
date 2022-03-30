import  Navbar  from "./components/navbar";
import Home from './components/home';
import './styles/main.scss';
import {ContextProvider} from "./components/context";

export default function App() {
  return (<>
    <ContextProvider>
      <Navbar />
        <Home  />
    </ContextProvider>
    </>);
}