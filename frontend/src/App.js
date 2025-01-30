import React from "react";
import AppRoutes from "./routes"; // Import routes
import "./styles/global.scss"; // Global styles
import "./index.css"; // Index styles

const App = () => {
  return (
    <div className="app-container">
      <AppRoutes /> {/* Load the routes here */}
    </div>
  );
};

export default App;
