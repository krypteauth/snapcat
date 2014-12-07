var express = require('express'),
	logger = require('morgan'),
	request = require('request')

var port = 9000

var app = express()
app.set('x-powered-by', false);
app.use(logger('combined'))
app.set('view engine', 'ejs')
app.use('public', express.static(__dirname + '/public'))

app.get('/', function (req, res){
	res.render('index')
})

app.get('/login', function (req, res){

	var token = req.query.token,
		root = req.query.root

	if (token) {
		console.log('http://'+root+'/data')
		var options = {
		    url: 'http://'+root+'/data',
		    headers: {
		        'X-Api-Token': token
		    }
		}
		request(options, function callback(error, response, body){
			if (!error && response.statusCode == 200) {

				var bod = JSON.parse(body).data
				res.render('user', {name:bod.name, email:bod.email})
			}
		})
	} else {
		res.send("No token")
	}
})

app.listen(port, function () {
	console.log('authy server: running on ' + port);
});