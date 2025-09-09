AI Projects Dashboard

A unified web dashboard to manage and monitor multiple AI projects running on your VM. This dashboard allows you to start, stop, check status, view logs, and open applications for each project. It is built with a Flask backend and React frontend, supporting Python, Java, Streamlit, and custom scripts.

🏗️ Project Structure
AI_Dashboard/
├── backend/                # Flask backend
│   ├── app.py              # Main Flask app
│   ├── projects.json       # Configuration of projects/services
│   ├── api.py              # Helper API functions
│   └── utils.py            # Utilities (status check, start/stop)
├── frontend/               # React frontend
│   ├── src/
│   │   ├── App.jsx         # Main dashboard component
│   │   ├── index.css       # Global CSS + Tailwind
│   │   ├── api.js          # Functions to call backend API
│   │   └── components/
│   │       ├── ProjectCard.jsx  # Project/service card
│   │       └── LogsViewer.jsx   # Logs modal
│   ├── package.json
│   └── vite.config.js
├── README.md
└── run_dashboard.sh        # Shell script to start all services

⚙️ Features

Start / Stop services of each project.

View current status (running / stopped) with live updates every 5 seconds.

View logs for each service in a modal viewer.

Open application links in a new tab:

RFP Cruncher → http://<VM_IP>:3001/

Customer Profiler → http://<VM_IP>:8501/

FariSight Analytics → http://<VM_IP>:3004/

Toast notifications for actions (start/stop success or failure).

Card-based responsive UI with Tailwind CSS.

🚀 Supported Projects
1. RFP Cruncher

Python backend → port 2999

Java backend → port 3000

React frontend → port 3001

2. Customer Profiler

Streamlit app → port 8501

3. FariSight Analytics

Python Uvicorn backend → port 3002

Python data generator → port 3003

Streamlit frontend → port 3004

💻 Setup Instructions
Backend (Flask)

Create Python virtual environment:

python3 -m venv venv
source venv/bin/activate


Install dependencies:

pip install -r backend/requirements.txt


Run the Flask app:

python backend/app.py


Default port: 5000.

Frontend (React)

Navigate to frontend directory:

cd frontend


Install dependencies:

npm install


Start frontend dev server:

npm run dev -- --host 0.0.0.0 --port 3001


Open browser at http://<VM_IP>:3001/.

Run All Services with Shell Script

You can start all backend, frontend, and Python/Streamlit services using the provided shell script:

bash run_dashboard.sh

🛠️ Usage

Open the dashboard in your browser.

Use cards to:

Start / Stop services

Refresh status

View logs

Open project apps

Status updates automatically every 5 seconds.

⚡ Notes

Ensure logs directories exist for each project (logs/) before starting.

Python generator for FariSight Analytics uses pkill to stop processes reliably.

The dashboard auto-refreshes project/service status every 5 seconds.

Toast notifications indicate success or failure of operations.

🖼️ Screenshots

(Optional: add screenshots of your dashboard here)

🧩 Future Improvements

Automatically generate Open App links from projects.json.

Add user authentication.

Support more AI projects dynamically without frontend changes.

Add resource usage indicators (CPU/RAM) per service.