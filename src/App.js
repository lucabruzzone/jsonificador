import './App.css';
import {Routes, Route } from 'react-router-dom';
import Main from './components/main/Main.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
