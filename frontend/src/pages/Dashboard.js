import React, { useEffect, useState } from 'react';
import { getTags } from '../api';
import '../styles/global.scss';

const Dashboard = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTags();
        setTags(response);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };
    fetchTags();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="tags-list">
        {tags.map(tag => (
          <div key={tag.id} className="tag-card">
            <h3>{tag.name}</h3>
            <p>Sensor Data: {tag.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;