from fastapi import FastAPI, WebSocket
from websocket import websocket_manager
from fastapi import Depends, HTTPException
from .auth import router as auth_router, oauth2_scheme
from jose import jwt
from influxdb_client import InfluxDBClient   
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .influx import store_iot_data
from .websocket import websocket_manager

app = FastAPI()
load_dotenv()

INFLUX_URL = os.getenv("INFLUXDB_URL")
INFLUX_TOKEN = os.getenv("INFLUXDB_TOKEN")
INFLUX_ORG = os.getenv("INFLUXDB_ORG")
INFLUX_BUCKET = os.getenv("INFLUXDB_BUCKET")
SECRET_KEY = "mysecretkey"  # Or load from .env


client = InfluxDBClient(url=influxdb_url, token=influxdb_token)
query_api = client.query_api()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Include auth router
app.include_router(auth_router)

def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
@app.post("/store-iot-data")
def store_data(temperature: float, humidity: float):
    store_iot_data(temperature, humidity)
    return {"message": "Data stored successfully"}

@app.get("/iot-data")
def get_iot_data():
    query = f'from(bucket: "{INFLUXDB_BUCKET}") |> range(start: -1h)'
    result = query_api.query(query)
    return {"data": result}


# Example function to write data to InfluxDB
def write_data(measurement, fields):
    write_api = client.write_api()
    point = {
        "measurement": measurement,
        "fields": fields,
    }
    write_api.write(bucket=influxdb_bucket, org=influxdb_org, record=point)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await websocket_manager.broadcast(f"Client says: {data}")
    except WebSocketDisconnect:
        websocket_manager.disconnect(websocket)
