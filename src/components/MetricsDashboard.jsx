import { useEffect, useState } from "react";

const API_URL = "http://localhost:8181/api/v1/sonar/metrics";

const toTitle = (str) =>
  str
    .replace(/_/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

function MetricsDashboard() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch metrics");
        }
        return res.json();
      })
      .then((data) => {
        setMetrics(data.component.measures);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading metrics...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard">
      <h1>Sonar Metrics Dashboard</h1>

      <div className="metrics-grid">
        {metrics.map((m, index) => (
          <div className="metric-card" key={index}>
            <h3>{toTitle(m.metric)}</h3>
            <p className="value">{m.value}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default MetricsDashboard;
