var location = function location(req, res, next) {
	// Todo: find IP address. 
	req.location = {
		"latitude": 0,
		"longitude": 0,
		"accuracy": 0
	};
	next();
}

module.export = location;