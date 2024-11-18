const jwt = require('jsonwebtoken')


const requestLogger = (request, response, next) => {
	console.log('Method: ', request.method);
	console.log('Path:', request.path);
	console.log('Body:', request.body);
	console.log('---');
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'unknown endpoint'});
};

const errorHandler = (error, request, response, next) => {

	console.log('Error handler triggered:', error.message);

	if (error.message === 'JsonWebTokenError: invalid signature') {
		return response.status(400).send({error: 'invalid token'});
	} else if (error.message === 'TokenExpiredError: jwt expired') {
		return response.status(400).json({error: error.message});
	} else if (error.message === 'Error: token invalid') {
		return response.status(400).send({error: 'invalid token'});
	}
	next(error);
};

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	// console.log('The authorization object: ', authorization)
	if (authorization && authorization.startsWith('Bearer ')) {
		const token = authorization.replace('Bearer ', '')
		try {
			request.token = jwt.verify(token, process.env.SECRET)
		} catch (error) {
			request.token = null
		}
	} else {
		request.token = null
	}
	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor
}