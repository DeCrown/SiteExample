const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());

global.SITE = 'НАЗВАНИЕ САЙТА';
global.NUMBER = '+7 - 800 - 555 - 35 - 35'
global.ROOTDIR = __dirname;
global.DOMEN = 'https://домен.рф';

app.use(/.*/, function(request, response, next) {
	if (/^((\/[^\/]+)+|\/)$/.test(request.originalUrl)) {
		next();
	}
	else {
		var addr = request.originalUrl.replace(/\/+/g, '/').replace(/\/$/, '');
		response.redirect(301, addr);
	}
});

app.use(/.*\/(js|css|images|api)\/(.+)/, function(request, response, next) {
	var m = request.originalUrl.match(/^(.*)\/(js|css|images|api)\/(.+)/);
	if (m[1].length == 0) {
		next();
	}
	else {
		response.redirect(301, "/" + m[2] + "/" + m[3]);
	}
});

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));

const loadmodules = require("./modules/loadmodules.js");
loadmodules(app);

const activation = require("./modules/activation.js");
activation(app);

/* Ошибки */

app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	
	if (res.locals.mobile) {
		res.render('mobile/500.hbs', {layout: 'mobile/default', SITE: SITE, NUMBER: NUMBER});
	}
	else {
		res.render('500.hbs', {SITE: SITE, NUMBER: NUMBER});
	}
});

app.use(function(req, res, next) {
	res.status(404);
	if (res.locals.mobile) {
		res.render('mobile/404.hbs', {layout: 'mobile/default', SITE: SITE, NUMBER: NUMBER});
	}
	else {
		res.render('404.hbs', {SITE: SITE, NUMBER: NUMBER});
	}
});

app.listen(5002);