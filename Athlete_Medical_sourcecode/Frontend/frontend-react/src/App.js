import React from 'react';
import {Routes,Route, Switch } from 'react-router-dom';
import './App.css';
import {Home} from './pages/Home';

function App() {
  return( 
  <>
    <Routes>
      <Switch>
        <Route path='/' element= {<Home/>} /> {/*path to different pages in the website*/}
      </Switch>          
    </Routes>
  </>  
  )}

export default App;
