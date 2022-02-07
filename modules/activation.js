
const main = require('./main.js');
const search = require('./search.js');
const article = require('./article.js');

function api_append(app, module) {
	
	app.get(module.addr, module.get);
	
	Object.keys(module.api).forEach(function(key) {
		app.post(`/api${module.addr}/${key}`, module.api[key]);
	});
	
}

module.exports = function(app) {
	
	api_append(app, main);
	
	api_append(app, search);
	
	api_append(app, article);
	
	app.get("/", function(request, response){
		response.redirect(301, 'главная');
	});
	
	app.get("/main", function(request, response){
		response.redirect(301, 'главная');
	});
	
}