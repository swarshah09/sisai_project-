from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from .auth import get_user
from .main import app
from .auth import verify_token

admin_router = APIRouter()

# Fake database for users and devices
users_db = {
    "admin": {"username": "admin", "password": "admin123", "role": "admin"},
    "user1": {"username": "user1", "password": "password", "role": "user"},
}

devices_db = [
    {"device_id": "device1", "status": "active"},
    {"device_id": "device2", "status": "inactive"},
]

# Fetch all users
@admin_router.get("/users")
def get_users():
    return users_db

@router.get("/admin/dashboard")
def admin_dashboard(token: dict = Depends(verify_token)):
    if token.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Access forbidden")
    return {"message": "Welcome Admin"}
# Manage devices (add, update status)
@admin_router.put("/devices/{device_id}")
def manage_device(device_id: str, status: str):
    for device in devices_db:
        if device["device_id"] == device_id:
            device["status"] = status
            return {"message": f"Device {device_id} status updated to {status}"}
    raise HTTPException(status_code=404, detail="Device not found")

app.include_router(admin_router)
