var chai = require('chai');
var chaiHttp = require('chai-http');
var intercept = require("intercept-stdout");
var fs = require('fs');

chai.use(chaiHttp);

describe('test some legacy code', function() {
  it('should not fail', function(done) {
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
  it('should load login page on GET', function(done) {
    var login_file = fs.readFileSync('public/login.html','utf8');

    chai.request('http://localhost:3000')
      .get('/login')
      .end(function(err, res) {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res).to.be.html;
        chai.expect(res.text).to.be.equal(login_file);
        done();
      });
  });
});

describe('test cli', function() {
  it('should not fail', function(done) {
    this.timeout(10000);
    var options = ['--help', 'fill_dummy_data', 'archive',
                    'dump', 'clean', 'init', 'clean']
    var counter = 0;
    for (var i in options) {
      const exec = require('child_process').exec;
      const child = exec('node app.js ' + options[i],
                          (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null) {
          console.log(`exec error: ${error}`);
        }
        counter++;
        if (counter == 7) {
          done();
        }
      });
    }
  });
});
