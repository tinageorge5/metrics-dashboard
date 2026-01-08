const apiUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchSonarQualityGates(projectKey) {
  const url = new URL(`${apiUrl}/api/v1/sonar/quality-gate`);
  url.searchParams.append('projectKey', projectKey);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error('Failed to fetch quality gates');
  }

  const data = await res.json();
  return data.projectStatus;
}

export default fetchSonarQualityGates;
