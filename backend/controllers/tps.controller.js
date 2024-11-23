const tpsService = require('../services/tps.service')

const getAllTps = async (request, response, next) => {
	try {
		const token = request.token
		const data = await tpsService.getAllTps(token);
		return response.status(200).json({
			message: 'Get all TPS success',
			data: data,
		});

	} catch (error) {
		next(error)
	}

}

const createNewTps = async (request, response, next) => {
	try {
		const payload = request.body;
		const token = request.token
		const data = await tpsService.createNewTps(payload, token)
		response.status(201).json({
			message: "Create new TPS success",
			data: data
		})
	} catch (error) {
		next(error)
	}
}

const updateTps = async (request, response) => {
	try {
		const token = request.token
		const payload = request.body;
		const id = request.params.id;
		const data = await tpsService.updateTps(id, payload, token);
		response.json({
			message: "Update TPS success",
			data: {
				id: id,
				...data
			}
		})
	} catch (error) {
		if (error.message === 'TPS not found') {
			return response.status(404).json({
				status: 'error',
				message: 'TPS not found'
			});
		}
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		});
	}
}


const deleteTps = async (request, response) => {
	try {
		const id = request.params.id
		const token = request.token
		await tpsService.deleteTps(id, token);
		response.json({
			message: `Delete TPS with ${id} success`
		})
	} catch (error) {
		if (error.message === 'TPS not found') {
			return response.status(404).json({
				status: 'error',
				message: 'TPS not found'
			});
		}
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		});
	}
}

const getTpsById = async (request, response) => {
	try {
		const id = request.params.id;
		const token = request.token
		const data = await tpsService.getTpsById(id, token);
		return response.status(200).json({
			status: 'success',
			message: 'Get TPS success',
			data
		});
	} catch (error) {
		if (error.message === 'TPS not found') {
			return response.status(404).json({
				status: 'error',
				message: 'TPS not found'
			});
		}
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		});
	}
};

module.exports = {
	getAllTps,
	createNewTps,
	deleteTps,
	getTpsById,
	updateTps
}