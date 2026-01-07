const API_URL = "http://localhost:8181/api/v1/sonar/metrics";

async function fetchSonarMetrics(projectKey) {
  const url = new URL(API_URL);
    url.searchParams.append("projectKey", projectKey);

    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error("Failed to fetch metrics");
    }

    const data = await res.json();
    return data.component.measures;
}

export default fetchSonarMetrics
