import React from 'react';
import Footer from '../components/Footer';
import HomeImage from '../components/HomeImage';
import Popup from '../components/Newsletter';

export function Home() {
    return (
     <div className="App">
      <Popup/>
      <HomeImage/>
      <Footer />
      
     </div>
  );
}
