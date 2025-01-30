from influxdb_client import InfluxDBClient, Point
from dotenv import load_dotenv

load_dotenv()


INFLUX_URL = os.getenv("INFLUXDB_URL")
INFLUX_TOKEN = os.getenv("INFLUXDB_TOKEN")
INFLUX_ORG = os.getenv("INFLUXDB_ORG")
INFLUX_BUCKET = os.getenv("INFLUXDB_BUCKET")

client = InfluxDBClient(url=INFLUX_URL, token=INFLUX_TOKEN, org=INFLUX_ORG)
write_api = client.write_api()

def store_iot_data(temperature, humidity):
    point = Point("iot_sensor").field("temperature", temperature).field("humidity", humidity)
    write_api.write(bucket=INFLUX_BUCKET, org=INFLUX_ORG, record=point)
