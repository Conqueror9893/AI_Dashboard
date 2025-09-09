import React, { useEffect, useState } from "react";
import "./index.css";
import ProjectCard from "./components/ProjectCard";
import { Toaster } from "react-hot-toast";

function App() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://10.32.2.151:5000/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
    const interval = setInterval(fetchProjects, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">
        🚀 AI Projects Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onAction={fetchProjects}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
