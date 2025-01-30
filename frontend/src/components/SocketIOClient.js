import { useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketIOClient = ({ setSensorData }) => {
  useEffect(() => {
    const socket = io("http://localhost:8000");

    // Listen for 'sensor_update' event
    socket.on("sensor_update", (data) => {
      console.log("Received sensor data:", data);
      setSensorData(data); // Update the sensor data in the component
    });

    return () => {
      socket.disconnect();
    };
  }, [setSensorData]);

  return null; // Component doesn't need to render anything
};

export default SocketIOClient;
