import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./GetJournal.module.css";
import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";

function GetJournal() {
  const [journals, setJournals] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://localhost:7209/api/journal/getAll");
      setJournals(response.data);
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = journals.filter((journal) =>
      journal.heading.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredJournals(filtered);
    if (filtered.length > 0) {
      setFeedback("");
    } else {
      setFeedback("kan ikke finne den journalen");
    }
  };

  return (
    <>
    <HeaderSpec/>
    <div className={styles.container}>
      <h2>Søk på navn</h2>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <button onClick={handleSearch}>Find</button>
      </div>
      {filteredJournals.length > 0 ? (
        <ul className={styles.list}>
          {filteredJournals.map((journal) => (
            <li key={journal.journalnoteId} className={styles.listItem}>
              <div className={styles.heading}>{journal.heading}</div>
              <div className={styles.journalnote1}>{journal.journalnote1}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.feedback}>{feedback}</p>
      )}
    </div>
    </>
  );
}

export default GetJournal;
