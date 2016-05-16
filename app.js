// the top level code for SMS

var db = require("./app/db");
var scan_coordinator = require("./app/scan_coordinator");
var agenda = require('./app/agenda_server');
var db_syncer = require("./app/db_syncer");
var bl = require("./app/bl");
var notifier = require("./app/notifier");
var server = require("./app/server");
var xutil = require('./app/xutil');
var util = require('util');
var fs = require('fs');

////////////////////////////////////////////////////
// parse command line

var options = {};

var settings_content = fs.readFileSync("config/settings.json");
options = JSON.parse(settings_content);

if (options.web && options.web.use_auth !== null) {
    options.web.use_auth = true;
}
options.cmd = "run"; // deafult command

if (process.argv.length >= 3) {
  if (process.argv[2] == "-t") {
    options.database.url = options.database.testUrl;
  } else if (process.argv[3] == "-t") {
    options.database.url = options.database.testUrl;
    options.cmd = process.argv[2];
  } else {
    options.cmd = process.argv[2];
  }
}

options.argv = process.argv;

if (options.cmd === "--help") {
    console.log("Usage: node app.js [options] [-t]\n");
    console.log("  -t - test mode");
    console.log("  -y - assume Yes to all queries and do not prompt\n");
    console.log('Default option is "run"\n');
    console.log('Options:');
    console.log("  --help - shows this help");
    console.log("  run - runs HTTP server that serves web page");
    console.log("  archive - archives old records from the database into archive files");
    console.log("  dump - dumps database data to console");
    console.log("  clean - deletes database data");
    console.log("  init - inserts startup data into database and creates admin user account");
    console.log("  fill_dummy_data - inserts dummy data into database");
} else {
  db.init(options, function (err) {
      if (err) return console.log(err);
      options.db = db;
      bl.init(options, function (err2) {
          if (err2) return console.log(err2);
          options.bl = bl;
          notifier.init(options, function (err2x) {
              if (err2x) return console.log(err2x);
              db_syncer.init(options, function (err6) {
                  if (err6) throw err6;
                  options.db_syncer = db_syncer;
                  scan_coordinator.init(options, function (err7) {
                      if (err7) throw err7;
                      options.scan_coordinator = scan_coordinator;
                      agenda.init(options, function (err9) {
                          if (err9) throw err9;
                          options.agenda = agenda;
                          if (options.cmd == "run") {
                              server.init(options, function (err3) {
                                  if (err3) return console.log(err);
                                  server.run(bl);
                              });
                          } else if (options.cmd == "dump") {
                              var collection_name = null;
                              if (process.argv.length >= 4)
                                  collection_name = process.argv[3];
                              db.dump(collection_name, function () {
                                  db.close();
                                  console.log("Done");
                                  process.exit(0);
                              });
                          } else if (options.cmd == "archive") {
                              db.archive(function () {
                                  db.close();
                                  console.log("Done");
                                  process.exit(0);
                              });
                          } else if (options.cmd == "clean") {
                              xutil.ask("Are you sure that you want to delete ALL data from the database?\nWARNING: This can't be undone!\nAnswer with [y/n]", /.+/, function (val) {
                                  if (val == "y" || val == "Y") {
                                      db.clean(function () {
                                          db.close();
                                          console.log("Done");
                                          process.exit(0);
                                      });
                                  } else {
                                      db.close();
                                      console.log("Aborted");
                                      process.exit(0);
                                  };
                              });
                          } else if (options.cmd == "fill_dummy_data") {
                              db.fill_dummy_data(function () {
                                  db.close();
                                  console.log("Done");
                                  process.exit(0);
                              });
                          } else if (options.cmd == "init") {
                              xutil.ask("Are you sure that you want to insert start data to database? Use node app.js clean first to delete all old data.\nWARNING: This can't be undone!\nAnswer with [y/n]", /.+/, function (val) {
                                  if (val == "y" || val == "Y") {
                                      db.init_sms(function () {
                                          db.close();
                                          console.log("Done");
                                          process.exit(0);
                                      });
                                  } else {
                                      db.close();
                                      console.log("Aborted");
                                      process.exit(0);
                                  };
                              });
                          } else if (options.cmd == "scan") {
                              var cluster_id = null;
                              if (options.argv.length >= 4) {
                                  cluster_id = options.argv[3];
                              }
                              scan_coordinator.scan(db_syncer, cluster_id, function (err8) {
                                  db.close();
                                  if (err8) throw err8;
                                  console.log("Done.");
                                  process.exit(0);
                              })
                          } else {
                              db.close();
                              console.log("Unknown command-line command: " + options.cmd);
                              process.exit(0);
                          }
                      });
                  });
              });
          });
      });
  });
}
