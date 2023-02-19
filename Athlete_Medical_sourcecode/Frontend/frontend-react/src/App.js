import React from 'react';
import {Routes,Route } from 'react-router-dom';
import {Home} from './pages/Home';

function App() {
  return( 
  <>

    <Home/>
    {/* <Routes>
      <Route path='/' element= {<Home/>} /> {/*path to different pages in the website            
    </Routes> */}
  </>  
  )}

export default App;
