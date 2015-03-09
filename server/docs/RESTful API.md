USING RESTful API
==========================

RESTful API was developed to provide the ability to upload sensor data from CITI-SENSE nodes using a dedicated android application. Only authorized users are able to access it using the following procedure: every request has to provide a header with fields "Authorization": "your_token" for authorization and field "Content-Type": ""application/json" for requests including data in JSON format. Your API token is located in the user settings page.
This is a list of available API methods and their sample usage:
#####GET all measurements:
a GET request has to be sent to "localhost:3000/api/measurements"
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
#####GET a single measurement:
a GET request has to be sent to "localhost:3000/api/measurements/:measurement_id" Sample response for "localhost:3000/api/measurements/5486f08fcbc42cac1e1adb74":
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
a POST request has to be sent to "localhost:3000/api/measurements", including sensor data in JSON format, for example (ts stands for timestamp, this can be omitted and a timestamp will be automatically generated and added):
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
a PUT request has to be sent to "localhost:3000/api/measurements/:measurement_id", including updated sensor data in JSON format. For example, a request to update the measurement with id 548701010b4b27b224a0f050 would be "localhost:3000/api/measurements/548701010b4b27b224a0f050" and a sample JSON data to update the value of the measurement would be:
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
a DELETE request has to be sent to localhost:3000/api/measurements/:measurement_id. For example, a request to delete the measurement with id 548706d02b88435029323ed2 would be "localhost:3000/api/measurements/548706d02b88435029323ed2". Sample response:
```json
{
    "message": "Measurement successfully deleted!"
}
```
