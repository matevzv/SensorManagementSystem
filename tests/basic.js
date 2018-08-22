var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('test basic operation', function() {
  this.timeout(60000);

  before(function(done) {
    var spawn = require('child_process').spawn;
    var srv = spawn('node', ['app.js']);
    setTimeout(done, 10000);
  })

  it('should run server and load login page', function(done) {
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
  });
});

exports.chai = chai;
