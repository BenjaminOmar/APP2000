import React, { useState } from 'react';
import FindUserCSS from "./FindUsers.module.css";
import SearchBar from './SearchBar';
import SearchResultList from './SearchResultList';
import SpecialistHeader from './SpecialistHeader';
function FindUsers() {

  const[results, setResults] = useState([]);
  
  return (
    <div className={FindUserCSS.container}>
      <div className={FindUserCSS.searchBarContainer}>
        <div>
          <SpecialistHeader/>
          <SearchBar setResults={setResults}/>
          <SearchResultList results={results}/>
        </div>
      </div>
    </div>
    

    
  );
}

export default FindUsers;
