import React, { useState, useEffect } from "react";
import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";
import styles from "./WriteJournal.module.css";

const WriteJournal = () => {
  const [heading, setHeading] = useState("");
  const [journalNote, setJournalNote] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(null); // added state for user ID

  useEffect(() => {
    // Fetch the user data based on first name and last name
    const fetchData = async () => {
      const response = await fetch(
        `api-url-here/users?firstName=${firstName}&lastName=${lastName}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setUserId(data[0].id); // set the user ID to the first matching user's ID
      }
    };
    if (firstName && lastName) {
      fetchData();
    }
  }, [firstName, lastName]);

  const handleSave = () => {
    // Make a POST request to the API with the journal data and user ID
    const journalData = {
      journalnote1: journalNote,
      heading,
      patient: userId // use the user ID in the journal data
    };
    // Make the POST request using fetch or axios
    fetch("api-url-here/journal-notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(journalData)
    })
      .then((response) => response.json())
      .then((data) => console.log(data)) // log the response data to the console
      .catch((error) => console.log(error)); // log any errors to the console
  };

  return (
    <>
    <HeaderSpec/>
    <div className={styles.container}>
      <h2 className={styles.heading}>Skrive Journal</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="heading">Oversikt:</label>
        <input
          type="text"
          id="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="journalNote">Journal Notat:</label>
        <textarea
          id="journalNote"
          value={journalNote}
          onChange={(e) => setJournalNote(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="firstName">Pasient førstnavn:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="lastName">Pasient etternavn:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <button
        className={styles.saveButton}
        onClick={handleSave}
        disabled={!userId} // disable the button if user ID is not found
      >
        Save
      </button>
    </div>
    </>
  );
};

export default WriteJournal;
