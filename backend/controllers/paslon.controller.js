const paslonService = require('../services/paslon.service')

const getAllPaslon = async (request, response) => {
	try {

		const data = await paslonService.getAllPaslon();
		return response.status(200).json({
			message: 'Get all Paslon success',
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

const createNewPaslon = async (request, response) => {
	try {
		const payload = request.body;
		await paslonService.createNewPaslon(payload)
		response.status(201).json({
			message: "Create new Paslon success",
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

const updatePaslon = async (request, response) => {
	try {
		const payload = request.body;
		const id = request.params.id;
		await paslonService.updatePaslon(id, payload);
		response.json({
			message: "Update Paslon success",
			data: {
				id: id,
				...payload
			}
		})
	} catch (error) {
		if (error.message === 'Paslon not found') {
			return response.status(404).json({
				status: 'error',
				message: 'Paslon not found'
			});
		}
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		});
	}
}


const deletePaslon = async (request, response) => {
	try {
		const id = request.params.id
		await paslonService.deletePaslon(id);
		response.json({
			message: `Delete Paslon with ${id} success`
		})
	} catch (error) {
		if (error.message === 'Paslon not found') {
			return response.status(404).json({
				status: 'error',
				message: 'Paslon not found'
			});
		}
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		});
	}
}

const getPaslonById = async (req, res) => {
	try {
		const id = req.params.id;
		const data = await paslonService.getPaslonById(id);
		return res.status(200).json({
			status: 'success',
			message: 'Get Paslon success',
			data
		});
	} catch (error) {
		if (error.message === 'Paslon not found') {
			return res.status(404).json({
				status: 'error',
				message: 'Paslon not found'
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
	getAllPaslon,
	createNewPaslon,
	deletePaslon,
	getPaslonById,
	updatePaslon
}