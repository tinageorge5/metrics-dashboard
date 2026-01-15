const apiUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchJiraMetrics(projectKey) {
  const url = new URL(`${apiUrl}/api/v1/jira/project-status`);
  url.searchParams.append('projectKey', projectKey);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error('Failed to fetch jira metrics');
  }

  const data = await res.json();
  return data;
}

export default fetchJiraMetrics;
