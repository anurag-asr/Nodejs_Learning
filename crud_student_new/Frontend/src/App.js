// import logo from './logo.svg';
import './App.css';
import { Router1 } from './allroutes/Routes';
import { Navbar } from './Components/Navbar';
import { MultipleCheck } from './Components/MultipleCheck';
// import Nav from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router1/>
      {/* <MultipleCheck/> */}
    </div>
  );
}

export default App;
