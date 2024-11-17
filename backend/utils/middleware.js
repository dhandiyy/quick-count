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
	if (error.message === 'JsonWebTokenError: invalid signature') {
		return response.status(400).send({error: 'invalid token'});
	} else if (error.message === 'TokenExpiredError: jwt expired') {
		return response.status(400).json({ error: error.message });
	}
	next(error); // Pass to default error handler if not handled here
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
}