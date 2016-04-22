
exports['test basic operation'] = function(assert, done) {
	var fs = require('fs')
	var http = require('http')

	var login_file = fs.readFileSync('public/login.html','utf8')

	var options = {
		host: 'localhost',
		path: '/login',
		port: '3000'
	}
	var request = http.get(options, function (response) {
		response.setEncoding('utf8')
		var str = '';
		response.on('data', function (chunk) {
			str += chunk;
		})

		response.on('end', function () {
			assert.equal(str, login_file, 'Login page loaded successfully!')
			done()
		})
	})
}

if (module == require.main) require('test').run(exports)
