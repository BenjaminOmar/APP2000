import React, {useState} from "react";


import SearchBarCSS from "./SearchBarCSS.module.css";
import  { FaSearch } from "react-icons/fa";

function SearchBar({setResults}) {
    const [input, setInput] = useState("")

    const fetchData = (value) => {
        fetch("https://localhost:7209/api/User/check")
        .then((response) => response.json())
        .then((json) => {
            const results = json.filter((user) => {
                return(
                    value &&
                    user &&
                    user.name &&
                    user.name.toLower().includes(value)

                );
            });
            setResults(results);
        });

    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }

    return (
        <div className={SearchBarCSS.inputWrapper}>
            <FaSearch className={SearchBarCSS.searchIcon}/>
            <input placeholder="Søk pasient..." value= {input} 
            onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )

    
}

export default SearchBar;

