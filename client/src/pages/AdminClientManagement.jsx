// src/pages/AdminClientManagement.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function AdminClientManagement() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: "", email: "", password: "" });

  const fetchClients = async () => {
    const config = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    const res = await axios.get("http://localhost:5000/api/admin/clients", config);
    setClients(res.data);
  };

  const handleStatusToggle = async (id) => {
    const config = { headers: { Authorization: localStorage.getItem("token") } };
    await axios.patch(`http://localhost:5000/api/admin/clients/${id}/toggle`, {}, config);
    fetchClients();
  };

  const handleDelete = async (id) => {
    const config = { headers: { Authorization: localStorage.getItem("token") } };
    await axios.delete(`http://localhost:5000/api/admin/clients/${id}`, config);
    fetchClients();
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: localStorage.getItem("token") } };
    await axios.post("http://localhost:5000/api/admin/clients", newClient, config);
    setNewClient({ name: "", email: "", password: "" });
    fetchClients();
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Client Management</h2>

      <form onSubmit={handleAddClient} className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-2">
        <input
          type="text"
          placeholder="Name"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newClient.email}
          onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newClient.password}
          onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <button className="bg-green-600 text-white rounded px-4 py-2">Add Client</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id} className="text-center">
              <td className="p-2 border">{client.name}</td>
              <td className="p-2 border">{client.email}</td>
              <td className="p-2 border">{client.status}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleStatusToggle(client._id)}
                  className="text-blue-600"
                >
                  {client.status === "active" ? "Hold" : "Activate"}
                </button>
                <button
                  onClick={() => handleDelete(client._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminClientManagement;
