from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import os
import json
import socket

app = Flask(__name__)
CORS(app)
CONFIG_FILE = os.path.join(os.path.dirname(__file__), "config/projects.json")

def load_projects():
    with open(CONFIG_FILE, "r") as f:
        return json.load(f)

def is_port_in_use(port):
    """Check if a TCP port is open (service running)."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(0.5)
        return s.connect_ex(("127.0.0.1", port)) == 0

@app.route("/projects", methods=["GET"])
def list_projects():
    projects = load_projects()
    for project in projects:
        for svc in project["services"]:
            svc["status"] = "running" if is_port_in_use(svc["port"]) else "stopped"
    return jsonify(projects)

@app.route("/projects/<project_id>/<service_id>/start", methods=["POST"])
def start_service(project_id, service_id):
    projects = load_projects()
    for project in projects:
        if project["id"] == project_id:
            for svc in project["services"]:
                if svc["id"] == service_id:
                    # Ensure log dir exists
                    os.makedirs(os.path.dirname(svc["log_file"]), exist_ok=True)
                    subprocess.Popen(svc["start_cmd"], cwd=svc["cwd"], shell=True, executable="/bin/bash")
                    return jsonify({"message": f"Started {svc['name']}"})
    return jsonify({"error": "Service not found"}), 404

@app.route("/projects/<project_id>/<service_id>/status", methods=["GET"])
def service_status(project_id, service_id):
    projects = load_projects()
    for project in projects:
        if project["id"] == project_id:
            for svc in project["services"]:
                if svc["id"] == service_id:
                    return jsonify({
                        "id": svc["id"],
                        "name": svc["name"],
                        "status": "running" if is_port_in_use(svc["port"]) else "stopped"
                    })
    return jsonify({"error": "Service not found"}), 404

@app.route("/projects/<project_id>/<service_id>/stop", methods=["POST"])
def stop_service(project_id, service_id):
    projects = load_projects()
    for project in projects:
        if project["id"] == project_id:
            for svc in project["services"]:
                if svc["id"] == service_id:
                    # Kill process using the port
                    subprocess.call(f"fuser -k {svc['port']}/tcp", shell=True)
                    return jsonify({"message": f"Stopped {svc['name']}"})
    return jsonify({"error": "Service not found"}), 404


@app.route("/projects/<pid>/<sid>/logs", methods=["GET"])
def get_logs(pid, sid):
    """Return last N lines of logs."""
    project = get_project(pid)
    if not project:
        return jsonify({"error": "project not found"}), 404
    service = get_service(project, sid)
    if not service:
        return jsonify({"error": "service not found"}), 404

    log_file = service.get("log_file")
    if not os.path.exists(log_file):
        return jsonify({"logs": ""})

    with open(log_file, "r") as f:
        lines = f.readlines()[-200:]  # last 200 lines
    return jsonify({"logs": "".join(lines)})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
