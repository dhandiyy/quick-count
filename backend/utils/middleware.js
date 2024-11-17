const requestLogger = (request, response, next) => {
	console.log('Method: ', request.method);
	console.log('Path:', request.path);
	console.log('Body:', request.body);
	console.log('---');
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
	console.log('Error handler triggered:', error); // Logging untuk debug

	if (error.name === 'Hasil Suara not found') {
		return response.status(400).send({error: 'malformatted id'});
		// } else if (error.name === 'ValidationError') {
		// 	return response.status(400).json({ error: error.message });
		// } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
		// 	return response.status(400).json({ error: 'expected `username` to be unique' });
		// } else if(error.name === 'JsonWebTokenError'){
		// 	return response.status(401).json({error: 'token invalid'})
		// } else if(error.name === 'TokenExpiredError') {
		// 	return response.status(401).json({error: 'token expired'})
		// }
	}
	next(error); // Pass to default error handler if not handled here
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
}