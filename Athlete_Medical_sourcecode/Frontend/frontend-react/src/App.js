import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Footer} from './components/Footer'; // legg til import for Footer-komponenten

function App() {
  return( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}
export default App;


