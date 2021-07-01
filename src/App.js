import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <NavBar/>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
