import React, { useState } from 'react';
import { createTag } from '../api';
import '../styles/global.scss';

const AdminPanel = () => {
  const [tagName, setTagName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTag({ name: tagName });
      setTagName('');
    } catch (error) {
      console.error('Failed to create tag:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tag Name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />
        <button type="submit" className="btn">Create Tag</button>
      </form>
    </div>
  );
};

export default AdminPanel;