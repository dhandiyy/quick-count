const jwt = require('jsonwebtoken')
const multer = require('multer')


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

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images');
	},
	filename: (req, file, cb) => {
		const timeStamp = new Date().getTime();
		const originalName = file.originalname;

		cb(null, `${timeStamp}-${originalName}`);
	}
})

const upload = multer({
	storage: storage,
	limits : {
		fileSize: 3 * 1000 * 1000 // 3mb
	},
	fileFilter: function (req, file, cb) {
		const allowedTypes = /jpeg|jpg|png|gif/;
		const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
		const mimetype = allowedTypes.test(file.mimetype);

		if (extname && mimetype) {
			return cb(null, true);
		} else {
			cb('Error: Images Only!');
		}
	}
})

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	upload
}