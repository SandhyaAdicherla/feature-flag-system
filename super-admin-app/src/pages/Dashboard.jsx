import "./Dashboard.css";
import {
  createOrganization,
  getOrganizations,
  deleteOrganization
} from "../services/organizationService";
import { useState, useEffect } from "react";

function Dashboard() {
  const [organizationName, setOrganizationName] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const data = await getOrganizations();
      setOrganizations(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateOrganization = async () => {
    if (!organizationName.trim()) {
      setError("Organization name is required");
      return;
    }

    setError("");

    try {
      await createOrganization({ name: organizationName });

      setOrganizationName("");
      fetchOrganizations();
      alert("Organization Created");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrganization(id);
      fetchOrganizations();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="navbar">
        <h2>Feature Flag System</h2>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      <div className="dashboard">
        <div className="card">
          <h3>Create Organization</h3>

          <input
            type="text"
            placeholder="Organization Name"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button onClick={handleCreateOrganization}>
            Create
          </button>
        </div>

        <div className="card">
          <h3>Organizations</h3>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {organizations.map((org) => (
                <tr key={org._id}>
                  <td>{org.name}</td>
                  <td>
                    <button onClick={() => handleDelete(org._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {organizations.length === 0 && (
                <tr>
                  <td colSpan="2">No Organizations Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;