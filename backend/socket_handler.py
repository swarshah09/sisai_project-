import socketio
from fastapi import FastAPI
from .auth import get_user
from .main import app

sio = socketio.Server()
app.add_event_handler("startup", lambda: sio.attach(app))

# Example: Emit data to the frontend when a sensor value changes
@sio.event
def connect(sid, environ):
    print(f"User {sid} connected.")

@sio.event
def disconnect(sid):
    print(f"User {sid} disconnected.")

@sio.event
def send_device_status(sid, device_id):
    # Fetch the device status and emit it
    status = get_device_status(device_id)
    sio.emit("device_status", {"device_id": device_id, "status": status})
