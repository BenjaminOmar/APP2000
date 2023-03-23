import React, { useState } from 'react';
import FindUserCSS from "./FindUsers.module.css";
import SearchBar from './SearchBar';
import SearchResultList from './SearchResultList';
import SideBar from './SideBar';
import TopBar from './TopBar';

function FindUsers() {

  const[results, setResults] = useState([]);
  
  return (
    <>
     <TopBar/>
    <div className={FindUserCSS.container}>
      <div className={FindUserCSS.searchBarContainer}>
        <div>
          <SearchBar setResults={setResults}/>
          <SearchResultList results={results}/>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default FindUsers;
