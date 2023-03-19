import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SpecialistHeader.module.css';


function SpecialistHeader() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="footer.png" alt="Logo" />
      </div>
      <div className={styles.categories}>
        <Link to="/findUsers" className={styles.category}>Finn pasient </Link>
        <Link to="/FindJournals" className={styles.category}>Finn journal </Link>
        <Link to="/WriteJournal" className={styles.category}>Skrive Journal </Link>
        <Link to="/" className={styles.category}>Lag timeplan</Link>
      </div>
    </div>
   
  );
}

export default SpecialistHeader;
