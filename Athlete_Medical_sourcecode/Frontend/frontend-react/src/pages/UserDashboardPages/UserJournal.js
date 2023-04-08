import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './UserJournal.module.css';
import HeaderUser from '../../components/UserDashboard/HeaderUser';

const UserJournal = () => {
  const [journalNotes, setJournalNotes] = useState([]);
  
  const userId = Cookies.get('userId');
  

  useEffect(() => {
    // Fetch data from API using axios
    axios.get('https://localhost:7209/api/journal/getAll')
      .then(response => {
        // Filter journal notes based on logged-in user's username
        const filteredNotes = response.data.filter(note => note.patient == userId);
        setJournalNotes(filteredNotes);
      })
      .catch(error => {
        console.error('Failed to fetch journal notes:', error);
      });
  }, [userId]);

  return (
    <>
    <HeaderUser/>
     <div>
      <h1>Mine journaler</h1>
      {journalNotes.length === 0 ? (
        <div className={styles.noJournalMessage}>Du har ingen journaler akkurat nå.</div>
      ) : (
        journalNotes.map(note => (
          <div key={note.journalnoteId} className={styles.journalNote}>
            <div className={styles.created}>{note.created}</div>
            <div className={styles.title}>{note.heading}</div>
            <div className={styles.journalNoteContent}>{note.journalnote}</div>
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default UserJournal;
