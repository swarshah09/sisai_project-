// frontend/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SocketIOClient from '../components/SocketIOClient';  


const Dashboard = () => {
  const [iotData, setIotData] = useState([]);
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/iot-data', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIotData(response.data);
      } catch (err) {
        setError("Failed to fetch IoT data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      <SocketIOClient setSensorData={setSensorData} />
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Live Sensor Data:</h2>
          <pre className="p-2 bg-gray-200 rounded-lg">{JSON.stringify(sensorData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
