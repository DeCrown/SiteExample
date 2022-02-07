
const expressHbs = require("express-handlebars");
const hbs = require("hbs");

function Hbs (app) {
	
	app.engine("hbs", expressHbs.engine(
		{
			layoutsDir: "views/layouts", 
			defaultLayout: "default",
			extname: "hbs",
			helpers: {
				MILEAGE: function(val) {
					return val.toLocaleString().replace(/,/g, " ");
				},
				CAPACITY: function(val) {
					return (val / 10).toFixed(1).replace(".", ",");
				},
				TRANSMISSION: function(val) {
					switch(val) {
						case 1:
							return "механическая";
						case 2:
							return "автомат";
						default:
							return "";
					}
				},
				PRICE: function(val) {
					return val.toLocaleString().replace(/,/g, " ");;
				},
				SITE_BR: function(val) {
					return new hbs.SafeString(val.replace(/\s/g, "<br>"));
				},
				PHOTOS_HEIGHT: function(val) {
					var max = 0;
					val.forEach(function(photo){
						if (photo.size[1] > max) {
							max = photo.size[1];
						}
					});
					
					return max;
				},
				NUMBER_FORMAT: function(val) {
					return val.replace(/[^0-9+]/g, '');
				}
			}
		}
	));
	
	app.set("view engine", "hbs");
	hbs.registerPartials(__dirname + "/views/partials");
}

const mongodb = require("mongodb");
global.MONGO = mongodb;

function MongoDB (app) {
	
	const MongoClient = mongodb.MongoClient;
	const url = "mongodb://localhost:27017/";
	
	const mongoClient = new MongoClient(url, { useUnifiedTopology: true });
	mongoClient.connect();
	
	global.mClient = mongoClient;
	app.locals.db = mongoClient.db("oas");
	app.locals.collection = app.locals.db.collection("articles");
	app.locals.brands = app.locals.db.collection("brands");
	app.locals.models = app.locals.db.collection("models");
	
}

global.MongoDB_get = function(collection, func, params = {}){
	
	params.status = 1;
	
	if (params.model_main) {
		params.model_main = {'$eq': new MONGO.ObjectID(params.model_main['$eq'])};
	}
	if (params.model_minor) {
		params.model_minor = {'$eq': new MONGO.ObjectID(params.model_minor['$eq'])};
	}
	
	collection.find(params).toArray(func);
}



const ismobile = require("./ismobile.js");

function isMobile (app) {
	
	app.use(/\/.*/, ismobile);
	
}

function SEO(app) {
	app.get('/robots.txt', function(req, res){
		res.sendFile(ROOTDIR + "/robots.txt");
	});

	app.get('/sitemap.xml', function(req, res){
		
		app.locals.collection.find({status: 1}).toArray(function(err, results){
			res.status(200);
			res.render('sitemap.hbs', {layout: false, urls: results});
		});
	});
}

module.exports = function(app) {
	
	Hbs(app);
	
	MongoDB(app);
	
	isMobile(app);
	
	SEO(app);
}