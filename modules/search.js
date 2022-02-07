
var description = 'Все выставленные на продажу автомобили проверены нашими специалистами и не имеют технических и юридических проблем';

module.exports = {
	addr: "/" + encodeURIComponent("подбор-автомобиля"),
	
	get: function(request, response){
		request.app.locals.collection.find({status: 1}).toArray(function(err, results){
			
			var year = [];
			var engine_capacity = [];
			
			results.forEach(function(article){
				if (!year.includes(article.year)) {
					year.push(article.year);
				}
				
				if (!engine_capacity.includes(article.engine_capacity)) {
					engine_capacity.push(article.engine_capacity);
				}
			});
			
			var model_main = [];
			
			request.app.locals.brands.find({}).toArray(function(err, results){
				results.forEach(function(brand){
					model_main.push({value: brand._id, title: brand.title});
				});
				
				var model_minor = [];
			
				request.app.locals.models.find({}).toArray(function(err, results){
					results.forEach(function(model){
						model_minor.push({value: model._id, main: model.brand, title: model.title});
					});
					
					year.sort();
					engine_capacity.sort();
					
					if (response.locals.mobile) {
						response.render("mobile/search.hbs", {layout: 'mobile/default', SITE: SITE, TITLE: 'Подбор автомобиля', NUMBER: NUMBER, url: DOMEN + '/подбор-автомобиля', description: description, preview: DOMEN + '/images/icons/preview.png', model_main: model_main, model_minor: model_minor, year: year, engine_capacity: engine_capacity, transmission: [1, 2]});
					}
					else {
						response.render("search.hbs", {layout: 'default', SITE: SITE, TITLE: 'Подбор автомобиля', NUMBER: NUMBER, url: DOMEN + '/подбор-автомобиля', description: description, preview: DOMEN + '/images/icons/preview.png', model_main: model_main, model_minor: model_minor, year: year, engine_capacity: engine_capacity, transmission: [1, 2]});
					}
				});
			});
			
		});
	},
	
	api: {
		get: function(request, response) {
			
			var params = request.body;
			
			MongoDB_get(request.app.locals.collection, function(err, results){
				
				if (results.length) {
					if (response.locals.mobile) {
						response.render("mobile/auto_list.hbs", {layout: false, count: results.length, articles: results});
					}
					else {
						response.render("auto_list.hbs", {layout: false, count: results.length, articles: results});
					}
				}
				else {
					response.render("no_articles.hbs", {layout: false});
				}
				
			}, params);
		}
	}
}