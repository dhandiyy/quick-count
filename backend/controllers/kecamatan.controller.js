const kecamatanService = require('../services/kecamatan.service')

const getAllKecamatan = async (request, response, next) => {
	try {
		const data = await kecamatanService.getAllKecamatan();
		return response.status(200).json({
			message: 'Get all Kecamatan success',
			data: data,
		});

	} catch (error) {
		next(error)
	}

}

const getKecamatanById = async (request, response) => {
	try {
		const id = request.params.id;
		const data = await kecamatanService.getKecamatanById(id);
		return response.status(200).json({
			status: 'success',
			message: 'Get Kecamatan success',
			data
		});
	} catch (error) {
		if (error.message === 'Kecamatan not found') {
			return response.status(404).json({
				status: 'error',
				message: 'Kecamatan not found'
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
	getAllKecamatan,
	getKecamatanById,
}