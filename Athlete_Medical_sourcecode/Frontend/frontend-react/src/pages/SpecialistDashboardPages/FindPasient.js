import React, { useState } from "react";
import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";
import FindPasientCSS from "./FindPasientCSS.module.css";
import { FaSearch } from "react-icons/fa";

const FindPasient = () => {
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchData = (value) => {
    fetch("https://localhost:7209/api/user/getAll")
      .then((response) => response.json())
      .then((json) => {
        const filteredResults = json.filter((user) => {
          return value && user && user.firstName && user.firstName.toLowerCase().includes(value);
        });
        setResults(filteredResults);
      });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    fetchData(value);
  };

  return (
    <>
     
        <HeaderSpec />
        <div className={FindPasientCSS.container}>
        <div className={FindPasientCSS.inputWrapper}>
          <FaSearch className={FindPasientCSS.searchIcon} />
          <input
            id="searchInput"
            className={FindPasientCSS.input}
            placeholder="Søk pasient..."
            value={searchValue}
            onChange={handleInputChange}
          />
        </div>
        <div className={FindPasientCSS.resultList}>
          <table style={{width: `calc(100% - 30px)`}}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{result.firstName}</td>
                  <td>{result.lastName}</td>
                  <td>{result.phoneNumber}</td>
                  <td>{result.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FindPasient;
