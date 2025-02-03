import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "employee" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("http://127.0.0.1:8000/dashboard/get-users");
    const data = await response.json();
    setUsers(data.users || []);
  };

  const handleAddUser = async () => {
    const response = await fetch("http://127.0.0.1:8000/dashboard/create-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      alert("User added!");
      fetchUsers();
    } else {
      alert("Error adding user");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <h3>Users:</h3>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>{user.name} - {user.role}</li>
        ))}
      </ul>
      <div>
        <input type="text" placeholder="Name" onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <input type="email" placeholder="Email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};

export default AdminDashboard;

const fetchUsers = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/dashboard/get-users");
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    setUsers(data.users || []);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

