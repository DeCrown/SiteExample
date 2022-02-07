
function count_str(count) {
	if (parseInt(count % 100 / 10) == 1 || count % 10 == 0 || count % 10 > 4) {
		return 'ЕЙ';
	}
	if (count % 10 > 1) {
		return 'Я';
	}
	return 'Ь';
}

var description = 'Все выставленные на продажу автомобили проверены нашими специалистами и не имеют технических и юридических проблем';

module.exports = {

	addr: "/" + encodeURIComponent("главная"),
	
	get: function(request, response){
		
		MongoDB_get(request.app.locals.collection, function(err, results){
			
			if (response.locals.mobile) {
				response.render("mobile/main.hbs", {layout: 'mobile/main', SITE: SITE, NUMBER: NUMBER, url: DOMEN + '/главная', description: description, preview: DOMEN + '/images/icons/preview.png', count: results.length, count_str: count_str(results.length).toLowerCase()});
			}
			else {
				response.render("main.hbs", {layout: 'main', SITE: SITE, NUMBER: NUMBER, url: DOMEN + '/главная', description: description, preview: DOMEN + '/images/icons/preview.png', count: results.length, count_str: count_str(results.length), articles: results});
			}
			
		});
	},
	
	api: {
		get: function(request, response) {
			
			MongoDB_get(request.app.locals.collection, function(err, results){
				
				response.render("mobile/auto_list.hbs", {layout: false, count: results.length, articles: results});
				
			});
		}
	}
}