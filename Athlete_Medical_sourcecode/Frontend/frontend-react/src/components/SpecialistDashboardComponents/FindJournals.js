import React, { useState } from 'react';

function FindJournals() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [journalData, setJournalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchJournalData() {
    setLoading(true);
    try {
      const response = await fetch(`https://localhost:7209/api/journal${firstName}/${lastName}/journals`);
      const data = await response.json();
      setJournalData(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return (
    <div>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <button onClick={fetchJournalData}>Find Journals</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {journalData && (
        <ul>
          {journalData.map((journal) => (
            <li key={journal.id}>
              <h3>{journal.heading}</h3>
              <p>{journal.note}</p>
              {/* Render other journal properties as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FindJournals;
