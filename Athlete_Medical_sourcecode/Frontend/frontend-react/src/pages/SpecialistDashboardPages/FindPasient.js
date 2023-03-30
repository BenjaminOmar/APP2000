import React, {useState} from "react";
import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";
import FindPasientCSS from "./FindPasientCSS.module.css";
import { FaSearch } from "react-icons/fa";

const FindPasient = () => {
    const [results, setResults] = useState([]);

    const fetchData = (value) => {
        fetch("https://localhost:7209/api/user/getAll")
        .then((response) => response.json())
        .then((json) => {
            const filteredResults = json.filter((user) => {
                return (
                    value &&
                    user &&
                    user.firstName &&
                    user.firstName.toLowerCase().includes(value)

                    
                );
            });
           // console.log(filteredResults);
            setResults(filteredResults);
        });
    };

    const handleInputChange = (value, event) => {
        if (event.key !== "Enter") {
          fetchData(value);
        }
      };

    return (
        <>
          <div>
            <HeaderSpec />
            <div className={FindPasientCSS.inputWrapper}>
              <FaSearch className={FindPasientCSS.searchIcon} />
              <input
                placeholder="Søk pasient..."
                onChange={(e) => handleInputChange(e.target.value, e)}
                onKeyDown={(e) => handleInputChange(e.target.value, e)}
                />
            </div>
            <div className={FindPasientCSS.resultList}>
              <table>
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
