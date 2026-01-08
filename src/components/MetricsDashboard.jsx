import { useEffect, useState } from 'react';
import fetchSonarMetrics from 'src/services/sonar-metrics.js';
import fetchSonarQualityGates from 'src/services/sonar-quality-gates.js';
import fetchProjects from 'src/services/sonar-projects.js';
import ProjectSelector from './ProjectSelector.jsx';
import './MetricsDashboard.css';

const toTitle = (str) => str.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

function MetricsDashboard() {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projectKey, setProjectKey] = useState();
  const [projectStatus, setProjectStatus] = useState();
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const measures = await fetchSonarMetrics(projectKey);
      const response = await fetchSonarQualityGates(projectKey);
      setProjectStatus(response);
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
      <h1>Metrics Dashboard</h1>
      <div className="controls">
        <ProjectSelector projects={projects} onChange={setProjectKey} />

        <button className="primary-button" onClick={() => loadMetrics()} disabled={!projectKey}>
          Load Metrics
        </button>
      </div>

      {loading && <p>Loading metrics...</p>}

      <div>
        {!error && !!projectStatus && (
          <p className="value">
            Quality Gate:
            <span style={{ color: projectStatus.status === 'OK' ? 'green' : 'red' }}>
              {projectStatus.status}
            </span>
          </p>
        )}
      </div>

      {projectStatus?.conditions.map((c) => (
        <div key={c.metricKey}>
          <span style={{ color: c.status === 'ERROR' ? 'red' : 'green' }}>
            <strong>{toTitle(c.metricKey)}</strong>: {c.actualValue}
            {' / '}
            {c.operator} {c.errorThreshold}
          </span>
        </div>
      ))}

      <div className="metrics-grid">
        {!error ? (
          metrics.map((m, index) => (
            <div className="metric-card" key={index}>
              <h3>{toTitle(m.metric)}</h3>
              <p className="value">{m.value}</p>
            </div>
          ))
        ) : (
          <p style={{ color: 'red' }}>{error}</p>
        )}
      </div>
    </div>
  );
}

export default MetricsDashboard;
