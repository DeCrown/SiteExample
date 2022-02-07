
module.exports = function isMobile(req, res, next) {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(req.headers["user-agent"])) {
		res.locals.mobile = true;
	} else {
		res.locals.mobile = false;
	}
	
	next();
}