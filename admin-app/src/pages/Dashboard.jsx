import { useState, useEffect } from "react";
import {
  createFeature,
  getFeatures,
  deleteFeature,
  updateFeature,
} from "../services/featureService";
import "./Dashboard.css";

function Dashboard() {
  const [featureKey, setFeatureKey] = useState("");
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const organizationId = localStorage.getItem("organizationId");

      const data = await getFeatures(organizationId);
      setFeatures(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateFeature = async () => {
    if (!featureKey.trim()) {
      setError("Feature key is required");
      return;
    }

    setError("");

    try {
      const organizationId = localStorage.getItem("organizationId");

      await createFeature({
        featureKey,
        enabled: false,
        organizationId,
      });

      setFeatureKey("");
      fetchFeatures();
      alert("Feature Created");
    } catch (error) {
      console.log(error);
      alert("Feature Creation Failed");
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await updateFeature(id, {
        enabled: !currentStatus,
      });

      fetchFeatures();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFeature(id);
      fetchFeatures();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="navbar">
        <h2>Feature Management</h2>

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
          <h3>Create Feature Flag</h3>

          <input
            type="text"
            placeholder="Feature Name"
            value={featureKey}
            onChange={(e) => setFeatureKey(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button onClick={handleCreateFeature}>
            Create Feature
          </button>
        </div>

        <div className="card">
          <h3>Feature Flags</h3>

          <table>
            <thead>
              <tr>
                <th>Feature Key</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {features.map((feature) => (
                <tr key={feature._id}>
                  <td>{feature.featureKey}</td>
                  <td>{feature.enabled ? "Enabled" : "Disabled"}</td>
                  <td>
                    <button onClick={() => handleToggle(feature._id, feature.enabled)}>
                      Toggle
                    </button>

                    <button onClick={() => handleDelete(feature._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {features.length === 0 && (
                <tr>
                  <td colSpan="3">No Features Found</td>
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