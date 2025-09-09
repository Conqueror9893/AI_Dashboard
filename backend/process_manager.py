import subprocess
import os
import signal

# Keep track of running processes
processes = {}  # {project_id: {service_id: Popen}}

def start_service(project_id, service_id, cmd, cwd):
    """Start a service as a subprocess and track it."""
    os.makedirs(os.path.join(cwd, "logs"), exist_ok=True)
    proc = subprocess.Popen(
        cmd,
        shell=True,
        cwd=cwd,
        preexec_fn=os.setsid  # run in its own process group
    )
    processes.setdefault(project_id, {})[service_id] = proc
    return proc.pid

def stop_service(project_id, service_id):
    """Stop a running service if it's tracked."""
    if project_id in processes and service_id in processes[project_id]:
        proc = processes[project_id][service_id]
        try:
            os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
        except ProcessLookupError:
            pass
        del processes[project_id][service_id]
        return True
    return False

def service_status(project_id, service_id):
    """Check if a service is running."""
    if project_id in processes and service_id in processes[project_id]:
        return processes[project_id][service_id].poll() is None
    return False
