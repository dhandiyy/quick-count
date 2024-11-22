const desaService = require('../services/desa.service')

const getAllDesa = async (request, response, next) => {
	try {
		const data = await desaService.getAllDesa();
		return response.status(200).json({
			message: 'Get all Desa success',
			data: data,
		});

	} catch (error) {
		next(error)
	}

}

const getDesaById = async (request, response) => {
	try {
		const id = request.params.id;
		const data = await desaService.getDesaById(id);
		return response.status(200).json({
			status: 'success',
			message: 'Get Desa success',
			data
		});
	} catch (error) {
		if (error.message === 'Desa not found') {
			return response.status(404).json({
				status: 'error',
				message: 'Desa not found'
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
	getAllDesa,
	getDesaById,
}