from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

client = InfluxDBClient(url="http://localhost:8086", token="your_token", org="your_org")
write_api = client.write_api(write_options=SYNCHRONOUS)

def write_data_to_influx(data):
    point = Point("iot_data").tag("sensor", data["sensor"]).field("value", data["value"]).time(data["time"], WritePrecision.NS)
    write_api.write(bucket="your_bucket", record=point)