const tpsService = require('../services/tps.service')

const getAllTps = async (request, response) => {
	try {

		const data = await tpsService.getAllTps();
		return response.status(200).json({
			message: 'Get all TPS success',
			data: data,
		});

	} catch (error) {
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		})
	}

}

const createNewTps = async (request, response) => {
	try {
		const payload = request.body;
		await tpsService.createNewTps(payload)
		response.status(201).json({
			message: "Create new TPS success",
			data: payload
		})
	} catch (error) {
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		})
	}
}

const updateTps = async (request, response) => {
	try {
		const payload = request.body;
		const idTps = request.params.id;
		await tpsService.updateTps(idTps, payload);
		response.json({
			message: "Update TPS success",
			data: {
				id: idTps,
				...payload
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
		const idTps = request.params.id
		await tpsService.deleteTps(idTps);
		response.json({
			message: `Delete TPS with ${idTps} success`
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

const getTpsById = async (req, res) => {
	try {
		const id = req.params.id;
		const data = await tpsService.getTpsById(id);
		return res.status(200).json({
			status: 'success',
			message: 'Get TPS success',
			data
		});
	} catch (error) {
		if (error.message === 'TPS not found') {
			return res.status(404).json({
				status: 'error',
				message: 'TPS not found'
			});
		}
		return res.status(500).json({
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