import React from "react";

export default function LogsViewer({ logs, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-4 w-3/4 h-3/4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">Logs</h3>
          <button onClick={onClose} className="text-red-600 font-bold">
            X
          </button>
        </div>
        <pre className="bg-gray-100 p-2 rounded overflow-y-scroll flex-grow text-sm">
          {logs}
        </pre>
      </div>
    </div>
  );
}
