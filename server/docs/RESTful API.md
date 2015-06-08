USING RESTful API
==========================

RESTful API was developed to provide the ability to upload sensor data. Only authorized users are able to access it using the following procedure: every request has to provide a header with fields "Authorization": "your_token" for authorization and field "Content-Type": "application/json" for requests including data in JSON format. Your API token is located in the user settings page.

Header example:
```json
{
    "Content-Type": "application/json",
    "Authorization": "bJy/hrH4vztPpSbVvEkIRaogHmF1ejZ0"
}
```

###A list of available API URIs:
- http://sms.ijs.si/api/measurements
- http://sms.ijs.si/api/nodes
- http://sms.ijs.si/api/clusters
- http://sms.ijs.si/api/sensors

###API entry point:
- http://sms.ijs.si/api

Sample response to a GET request to "http://sms.ijs.si/api":
```json
{
    "collections": {
        "nodes": {
            "Collection URI": "/nodes",
            "Collection methods": "GET, POST",
            "Document URI": "/nodes/:node_id",
            "Document methods": "GET, PUT, DELETE"
        },
        "clusters": {
            "Collection URI": "/clusters",
            "Collection methods": "GET, POST",
            "Document URI": "/clusters/:cluster_id",
            "Document methods": "GET, PUT, DELETE"
        },
        "sensors": {
            "Collection URI": "/sensors",
            "Collection methods": "GET, POST",
            "Document URI": "/sensors/:sensor_id",
            "Document methods": "GET, PUT, DELETE"
        },
        "measurements": {
            "Collection URI": "/measurements",
            "Collection methods": "GET, POST",
            "Document URI": "/measurements/:measurement_id",
            "Document methods": "GET, PUT, DELETE"
        }
    }
}
```


###API sample usage
#####GET all measurements:
a GET request has to be sent to "http://sms.ijs.si/api/measurements"
Sample response:
```json
[
    {
        "_id": "5486f08fcbc42cac1e1adb74",
        "sensor": "SHT21-temperature",
        "node": 56,
        "sys_data": {},
        "value": 5,
        "ts": "2014-12-09T12:52:31.785Z"
    },
    {
        "_id": "5486f08ccbc42cac1e1adb73",
        "sensor": "SHT21-temperature",
        "node": 56,
        "sys_data": {},
        "value": 10,
        "ts": "2014-12-09T12:52:28.416Z"
    },
    {
        "_id": "5486f088cbc42cac1e1adb72",
        "sensor": "SHT21-temperature",
        "node": 56,
        "sys_data": {},
        "value": 15,
        "ts": "2014-12-09T12:52:24.147Z"
    }
]
```
#####GET measurements based on time, node id, node _id, sensor id or sensor _id queries:
a sample response to the following GET request "http://sms.ijs.si/api/measurements?from=2015-01-01&to=2015-03-01&node_id=5491756ae95c5f70261a6e92":
```json
[
    {
        "_id": "54da35226dd77866261d044a",
        "sensor": "SHT21-humidity",
	"sensor_id": "54da2cf5f683562dc21e25ef",
        "node": 56,
        "sys_data": {},
        "value": 50,
        "ts": "2015-02-10T16:43:14.015Z",
        "node_id": "5491756ae95c5f70261a6e92"
    },
    {
        "_id": "54d88dd1a6e663ea1424fb4a",
        "sensor": "SHT21-temperature",
	"sensor_id": "54da3608f683562dc21e25f0",
        "node": 56,
        "sys_data": {},
        "value": 20,
        "ts": "2015-02-09T10:37:05.243Z",
        "node_id": "5491756ae95c5f70261a6e92"
    }
]
```
#####GET a single measurement:
a GET request has to be sent to "http://sms.ijs.si/api/measurements/:measurement_id" Sample response for "http://sms.ijs.si/api/measurements/5486f08fcbc42cac1e1adb74":
```json
[
    {
        "_id": "5486f08fcbc42cac1e1adb74",
        "sensor": "SHT21-temperature",
        "node": 56,
        "sys_data": {},
        "value": 5,
        "ts": "2014-12-09T12:52:31.785Z"
    }
]
```
#####POST a single measurement:
a POST request has to be sent to "http://sms.ijs.si/api/measurements", including sensor data in JSON format, for example (ts stands for timestamp, this can be omitted and a timestamp will be automatically generated and added):
```json
{"sensor": "SHT21-temperature","node": 19,"ts": "2014-07-24T15:14:30.850Z","sys_data": {},"value": 25}
```
Sample response:
```json
{
    "message": "Measurement successfully added!"
}
```
#####UPDATE a single measurement:
a PUT request has to be sent to "http://sms.ijs.si/api/measurements/:measurement_id", including updated sensor data in JSON format. For example, a request to update the measurement with id 548701010b4b27b224a0f050 would be "http://sms.ijs.si/api/measurements/548701010b4b27b224a0f050" and a sample JSON data to update the value of the measurement would be:
```json
{"value": 25}
```
Sample response:
```json
{
    "message": "Measurement successfully updated!"
}
```
#####DELETE a single measurement:
a DELETE request has to be sent to http://sms.ijs.si/api/measurements/:measurement_id. For example, a request to delete the measurement with id 548706d02b88435029323ed2 would be "http://sms.ijs.si/api/measurements/548706d02b88435029323ed2". Sample response:
```json
{
    "message": "Measurement successfully deleted!"
}
```

Other collections (clusters, nodes, sensors) support the same set of request methods, but don't support querying for now.