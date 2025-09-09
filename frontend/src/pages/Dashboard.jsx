import React, { useEffect, useState } from "react";
import { fetchProjects } from "../api";
import ProjectCard from "../components/ProjectCard";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const { data } = await fetchProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
    const interval = setInterval(loadProjects, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">AI Projects Dashboard</h1>
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}
