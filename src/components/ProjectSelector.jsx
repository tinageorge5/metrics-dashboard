import { useState } from 'react';

export default function ProjectSelector({ projects, onChange }) {
  const [selectedKey, setSelectedKey] = useState('');

  const handleChange = (e) => {
    const key = e.target.value;
    setSelectedKey(key);

    const project = projects.find((p) => p.projectKey === key);
    if (onChange) onChange(project.projectKey);
  };

  return (
    <select value={selectedKey} onChange={handleChange}>
      <option value="">-- Select a project --</option>
      {projects?.map((p) => (
        <option key={p.projectKey} value={p.projectKey}>
          {p.projectName}
        </option>
      ))}
    </select>
  );
}
