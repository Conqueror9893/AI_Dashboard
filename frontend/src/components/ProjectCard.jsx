import React, { useState } from "react";
import { startService, stopService, fetchLogs } from "../api";
import LogsViewer from "./LogsViewer";
import toast from "react-hot-toast";

export default function ProjectCard({ project, onAction }) {
  const [logs, setLogs] = useState("");
  const [showLogs, setShowLogs] = useState(false);
  const [loadingService, setLoadingService] = useState(null);

  const handleStart = async (sid) => {
    setLoadingService(sid);
    try {
      await startService(project.id, sid);
      toast.success(`${project.name} - ${sid} started ✅`);
    } catch (err) {
      toast.error(`Failed to start ${sid}`);
    }
    setLoadingService(null);
    onAction();
  };

  const handleStop = async (sid) => {
    setLoadingService(sid);
    try {
      await stopService(project.id, sid);
      toast.success(`${project.name} - ${sid} stopped 🛑`);
    } catch (err) {
      toast.error(`Failed to stop ${sid}`);
    }
    setLoadingService(null);
    onAction();
  };

  const handleLogs = async (sid) => {
    const { data } = await fetchLogs(project.id, sid);
    setLogs(data.logs);
    setShowLogs(true);
  };

  const statusBadge = (status) => {
    if (status === "running") {
      return (
        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          ✅ Running
        </span>
      );
    }
    return (
      <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
        ❌ Stopped
      </span>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition card-animate">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{project.name}</h2>
        {project.name === "RFP Cruncher" && (
          <a
            href="http://10.32.2.151:3001/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Open App
          </a>
        )}
        {project.name === "Customer Profiler" && (
          <a
            href="http://10.32.2.151:8501/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Open App
          </a>
        )}
        {project.name === "FariSight Analytics" && (
          <a
            href="http://10.32.2.151:3004/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Open App
          </a>
        )}
      </div>

      {project.services.map((svc) => (
        <div
          key={svc.id}
          className="flex items-center justify-between border-t py-3"
        >
          <div>
            <span className="font-medium">{svc.name}</span>
            {statusBadge(svc.status)}
          </div>

          <div className="space-x-2 flex items-center">
            <button
              onClick={() => handleStart(svc.id)}
              disabled={loadingService === svc.id}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loadingService === svc.id ? "⏳ Starting..." : "Start"}
            </button>

            <button
              onClick={() => handleStop(svc.id)}
              disabled={loadingService === svc.id}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              {loadingService === svc.id ? "⏳ Stopping..." : "Stop"}
            </button>

            <button
              onClick={() => handleLogs(svc.id)}
              className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Logs
            </button>
          </div>
        </div>
      ))}

      {showLogs && (
        <LogsViewer logs={logs} onClose={() => setShowLogs(false)} />
      )}
    </div>
  );
}
