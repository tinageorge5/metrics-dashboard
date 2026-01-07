const apiUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchSonarMetrics(projectKey) {
  const url = new URL(`${apiUrl}/api/v1/sonar/metrics`);
    url.searchParams.append("projectKey", projectKey);

    const res = await fetch(url.toString());

    if (!res.ok) {
      throw new Error("Failed to fetch metrics");
    }

    const data = await res.json();
    return data.component.measures;
}

export default fetchSonarMetrics
