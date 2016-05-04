var chai = require('chai');
var chaiHttp = require('chai-http');
var fs = require('fs');

chai.use(chaiHttp);

describe('test some legacy code', function() {
  it('should not fail', function(done) {
    var intercept = require("intercept-stdout");

    captured_text = "";

    var unhook_intercept = intercept(function(txt) {
      captured_text += txt;
    });

    var tester = require('./cv_tester').get_tester();
    require('../app/parser').unit_tests(tester);
    require('../app/xutil').unit_tests(tester);

    unhook_intercept();

    chai.expect(captured_text).to.not.contain('fail');
    done();
  });
});

describe('test basic operation', function() {
  it('should run server and load login page on GET', function(done) {
    this.timeout(10000);
    var spawn = require('child_process').spawn;
    var srv = spawn('node', ['app.js', '-t']);

    srv.stdout.on('data', function (data) {
      if (data.indexOf("Running HTTP server") > -1) {
        var login_file = fs.readFileSync('public/login.html','utf8');

        chai.request('http://localhost:3000')
          .get('/login')
          .end(function(err, res) {
            chai.expect(err).to.be.null;
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.be.html;
            chai.expect(res.text).to.be.equal(login_file);
            srv.kill();
            done();
        });
      }
    });
  });
});

describe('test cli', function() {
  this.timeout(10000);

  describe('test help', function() {
    it('should not fail', function(done) {
      const exec = require('child_process').exec;
      var cli = 'node app.js --help';
      const child = exec(cli, (error, stdout, stderr) => {
        chai.expect(error).to.be.a('null');
        done();
      });
    });
  });

  describe('test clean', function() {
    it('should not fail', function(done) {
      const exec = require('child_process').exec;
      var cli = 'node app.js clean -t';
      const child = exec(cli, (error, stdout, stderr) => {
        chai.expect(error).to.be.a('null');
        done();
      });
    });
  });

  describe('test fill dummy data', function() {
    it('should not fail', function(done) {
      const exec = require('child_process').exec;
      var cli = 'node app.js fill_dummy_data -t';
      const child = exec(cli, (error, stdout, stderr) => {
        chai.expect(error).to.be.a('null');
        done();
      });
    });
  });

  describe('test archive', function() {
    it('should not fail', function(done) {
      const exec = require('child_process').exec;
      var cli = 'node app.js archive -t';
      const child = exec(cli, (error, stdout, stderr) => {
        chai.expect(error).to.be.a('null');
        done();
      });
    });
  });

  describe('test dump', function() {
    it('should not fail', function(done) {
      const exec = require('child_process').exec;
      var cli = 'node app.js dump -t';
      const child = exec(cli, (error, stdout, stderr) => {
        chai.expect(error).to.be.a('null');
        done();
      });
    });
  });

  describe('test init', function() {
    it('should not fail', function(done) {
      var settings_content = fs.readFileSync("config/settings.json");
      options = JSON.parse(settings_content);
      const exec = require('child_process').exec;
      var cli = 'node app.js clean -t';
      cli += ' && node app.js init -t';
      cli += ' && mongo ' + options.database.testUrl.substring(10);
      cli += ' --eval "db.dropDatabase()"';
      const child = exec(cli, (error, stdout, stderr) => {
        chai.expect(error).to.be.a('null');
        done();
      });
    });
  });
});
