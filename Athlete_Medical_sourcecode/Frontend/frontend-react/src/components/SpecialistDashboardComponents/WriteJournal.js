import React, { useState } from 'react';

function WriteJournal() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function postJournal() {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7209/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: inputValue })
      });
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  return (
    <div>
      <label>
        Journal content:
        <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      </label>
      <button onClick={postJournal}>Save Journal</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}

export default WriteJournal;
