import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:8000/admin/users");
        const deviceResponse = await axios.get("http://localhost:8000/admin/devices");
        setUsers(userResponse.data);
        setDevices(deviceResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleUpdateDeviceStatus = async (deviceId, status) => {
    try {
      await axios.put(`http://localhost:8000/admin/devices/${deviceId}`, { status });
      setDevices(devices.map(device => 
        device.device_id === deviceId ? { ...device, status } : device
      ));
    } catch (error) {
      console.error("Error updating device:", error);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <h2>Users</h2>
      <pre>{JSON.stringify(users, null, 2)}</pre>

      <h2>Devices</h2>
      {devices.map((device) => (
        <div key={device.device_id}>
          <span>{device.device_id} - {device.status}</span>
          <button onClick={() => handleUpdateDeviceStatus(device.device_id, 'active')}>Activate</button>
          <button onClick={() => handleUpdateDeviceStatus(device.device_id, 'inactive')}>Deactivate</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
