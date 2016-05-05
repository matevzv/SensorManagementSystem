var chai = require('chai');
var chaiHttp = require('chai-http');
var fs = require('fs');

chai.use(chaiHttp);

describe('test basic operation', function() {
  it('should run server and load login page', function(done) {
    this.timeout(30000);
    var spawn = require('child_process').spawn;
    var srv = spawn('node', ['app.js']);

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

    srv.stderr.on('data', function (data) {
      chai.expect(data.toString()).to.not.contain('Error');
    });

    srv.on('exit', function (code) {
      chai.expect(code).to.equal(0);
      done();
    });
  });
});
