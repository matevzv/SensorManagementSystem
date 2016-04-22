// progressive notifications - when enables they notify external systems about events inside SMS via REST call

var xutil = require('./xutil');
var http_client_lib = new require('./communication/http_client');

var db = null;

function after_sensor_scan(node_id, sensor_id, measurement_ts, options, callback) {
    callback = callback || function () { };
    bl.rest_sensorData(node_id, sensor_id, measurement_ts, function (err, data) {
        if (err) {
            if (callback) return callback(err);
            return;
        }
        
        var http_client = new http_client_lib.HttpClient();
        http_client.post_data(
            options.server,
            options.port,
            options.path_after_sensor_scan,
            data,
            callback
        );
    });
}

function api_after_sensor_scan(data, options, callback) {
    callback = callback || function () { };
    var http_client = new http_client_lib.HttpClient();
    http_client.post_data(
        options.server,
        options.port,
        options.path_after_sensor_scan,
        data,
        callback
    );
}

function after_node_change(node_id, options, callback) {
    callback = callback || function () { };
    bl.node_data(node_id, function (err, data) {
        if (err) {
            if (callback) return callback(err);
            return;
        }

        var http_client = new http_client_lib.HttpClient();
        http_client.post_data(
            options.server,
            options.port,
            options.path_after_node_change,
            data,
            callback
        );
    });
}

function after_sensor_change(node_id, options, callback) {
    callback = callback || function () { };
    bl.rest_sensorInfo(node_id, function (err, data) {
        if (err) {
            if (callback) return callback(err);
            return;
        }

        var http_client = new http_client_lib.HttpClient();
        http_client.post_data(
            options.server,
            options.port,
            options.path_after_sensor_change,
            data,
            callback
        );
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////

exports.init = function (_options, callback) {
    db = _options.db;
    bl = _options.bl;
    bl.set_notify_after_node_change(after_node_change);
    bl.set_notify_after_sensor_scan(after_sensor_scan);
    bl.set_notify_after_sensor_change(after_sensor_change);
    bl.api_set_notify_after_sensor_scan(api_after_sensor_scan);
    callback();
}