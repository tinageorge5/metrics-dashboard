import { useEffect, useState } from "react";
import fetchSonarMetrics from "src/services/sonar.js";
import "./MetricsDashboard.css";

const toTitle = (str) =>
  str
    .replace(/_/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

function MetricsDashboard() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projectKey, setProjectKey] = useState();

  const useFetchSonarMetrics = {fetchSonarMetrics};

    const loadMetrics = async () => {
      try {
          setLoading(true);
        const measures = await fetchSonarMetrics(projectKey);
        setMetrics(measures);
        setError(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="dashboard">
      <h1>Sonar Metrics Dashboard</h1>
      <div className="controls">
      <input
        type="text"
        placeholder="Enter project key"
        className="text-input"
        value={projectKey}
        onChange={(e) => setProjectKey(e.target.value)}
      />

      <button
        className="primary-button"
        onClick={() => loadMetrics()}
        disabled={!projectKey}
      >
        Load Metrics
      </button>
    </div>

      <div className="metrics-grid">
          {loading && <p>Loading metrics...</p>}

        {!error ? metrics.map((m, index) => (
          <div className="metric-card" key={index}>
            <h3>{toTitle(m.metric)}</h3>
            <p className="value">{m.value}</p>
          </div>
        )): <p style={{ color: "red" }}>{error}</p>
        }
      </div>

    </div>
  );
}

export default MetricsDashboard;
