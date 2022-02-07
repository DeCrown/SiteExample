
module.exports = {
	addr: new RegExp("\/" + encodeURIComponent("объявление") + "\/(.+)\/([A-z0-9]{24})"),
	
	get: function(request, response, next) {
		
		var title = request.params[0];
		var id = new MONGO.ObjectID(request.params[1]);
	
		MongoDB_get(request.app.locals.collection, function(err, results){
			if (results.length) {
				var result = results[0];
				if (result.title == title) {
					if (response.locals.mobile) {
						response.render("mobile/article.hbs", {layout: 'mobile/default', SITE: SITE, TITLE: result.title, NUMBER: NUMBER, url: DOMEN + '/объявление/' + result.title + '/' + result._id, description: result.description, preview: DOMEN + '/images/articles/' + result.photos[0].filename, article: result});
					}
					else {
						response.render("article.hbs", {SITE: SITE, TITLE: result.title, NUMBER: NUMBER, url: DOMEN + '/объявление/' + result.title + '/' + result._id, description: result.description, preview: DOMEN + '/images/articles/' + result.photos[0].filename, article: result});
					}
				}
				else {
					response.redirect(301, '/объявление/' + result.title + '/' + result._id);
				}
			} else {
				next();
			}
		}, {_id: id});
	},
	
	api: {}
}