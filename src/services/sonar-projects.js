const apiUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchProjects() {
  const url = new URL(`${apiUrl}/api/v1/sonar/projects`);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }

  const data = await res.json();
  return data.projects;
}

export default fetchProjects;
