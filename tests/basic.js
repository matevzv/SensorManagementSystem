var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('test basic operation', function() {
  it('should run server and load login page', function(done) {
    this.timeout(60000);
    var spawn = require('child_process').spawn;
    var srv = spawn('node', ['app.js']);

    srv.stdout.on('data', function (data) {
      if (data.indexOf("Running HTTP server") > -1) {
        var fs = require('fs');
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
      }
    });
  });
});

exports.chai = chai;
