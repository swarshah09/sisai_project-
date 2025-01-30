from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_users():
    response = client.get("/auth/users/me")
    assert response.status_code == 200
    assert response.json() == {"username": "admin"}

def test_store_iot_data():
    response = client.post("/store-iot-data", json={"temperature": 23.5, "humidity": 60})
    assert response.status_code == 200
    assert response.json() == {"message": "Data stored successfully"}

