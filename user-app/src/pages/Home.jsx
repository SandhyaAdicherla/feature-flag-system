import { useEffect, useState } from "react";
import { checkFeature } from "../services/featureService";
import { getOrganizations } from "../services/organizationService";
import "./Home.css";

function Home() {
  const [organizations, setOrganizations] = useState([]);
  const [organizationId, setOrganizationId] = useState("");
  const [featureKey, setFeatureKey] = useState("");
  const [result, setResult] = useState(null);

  const [errors, setErrors] = useState({});

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

  const validate = () => {
    let err = {};

    if (!organizationId) {
      err.organizationId = "Please select organization";
    }

    if (!featureKey.trim()) {
      err.featureKey = "Feature key is required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleCheck = async () => {
    if (!validate()) return;

    try {
      const data = await checkFeature(organizationId, featureKey);
      setResult(data);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Feature Checker</h1>

        <select
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
        >
          <option value="">Select Organization</option>
          {organizations.map((org) => (
            <option key={org._id} value={org._id}>
              {org.name}
            </option>
          ))}
        </select>
        {errors.organizationId && (
          <p className="error">{errors.organizationId}</p>
        )}

        <input
          type="text"
          placeholder="Feature Key"
          value={featureKey}
          onChange={(e) => setFeatureKey(e.target.value)}
        />
        {errors.featureKey && (
          <p className="error">{errors.featureKey}</p>
        )}

        <button onClick={handleCheck}>Check Feature</button>

        {result && (
          <div className="result">
            <h3>
              Status: {result.enabled ? "Enabled ✅" : "Disabled ❌"}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;