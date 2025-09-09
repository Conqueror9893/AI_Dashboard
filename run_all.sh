#!/bin/bash
set -e

# === CONFIG ===
FRONTEND_DIR="/opt/preslaes/AI_Projects/AI_Dashboard/frontend"
BACKEND_DIR="/opt/preslaes/AI_Projects/AI_Dashboard/backend"
LOG_DIR="/opt/preslaes/AI_Projects/AI_Dashboard/logs"

# Create logs directory if not exists
mkdir -p "$LOG_DIR"

echo "?? Starting AI Dashboard..."

# === Start Backend ===
echo "? Starting Flask backend..."
cd "$BACKEND_DIR"

# Activate conda env (aienv)
eval "$(/home/presales/miniconda/bin/conda shell.bash hook)"
conda activate aienv

nohup python app.py > "$LOG_DIR/backend.log" 2>&1 &
BACKEND_PID=$!
echo "? Backend running with PID $BACKEND_PID (logs: $LOG_DIR/backend.log)"

# === Start Frontend ===
echo "? Starting React frontend..."
cd "$FRONTEND_DIR"

nohup npm run dev -- --host 0.0.0.0 --port 5173 > "$LOG_DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo "? Frontend running with PID $FRONTEND_PID (logs: $LOG_DIR/frontend.log)"

echo ""
echo "========================================"
echo " AI Dashboard is running!"
echo " Backend ? http://localhost:5000"
echo " Frontend ? http://localhost:5173"
echo "========================================"
