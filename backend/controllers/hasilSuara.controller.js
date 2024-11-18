const hasilSuaraService = require('../services/hasilSuara.service')

const getAllHasilSuara = async (request, response) => {
	try {
		const token = request.token
		const data = await hasilSuaraService.getAllHasilSuara(token);
		return response.status(200).json({
			message: 'Get all Hasil Suara success',
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

const createNewHasilSuara = async (request, response, next) => {
	try {
		const payload = await hasilSuaraService.createNewHasilSuara(request)
		response.status(201).json({
			message: "Create new Hasil Suara success",
			data: payload
		})
	} catch (error) {
		next(error)
	}
}

const updateHasilSuara = async (request, response) => {
	try {
		const token = request.token
		const payload = request.body;
		const id = request.params.id;
		await hasilSuaraService.updateHasilSuara(id, payload, token);
		response.json({
			message: "Update Hasil Suara success",
			data: {
				id: id,
				...payload
			}
		})
	} catch (error) {
		if (error.message === 'Hasil Suara not found') {
			return response.status(404).json({
				status: 'error',
				message: 'Hasil Suara not found'
			});
		}
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		});
	}
}


const deleteHasilSuara = async (request, response) => {
	try {
		const token = request.token
		const id = request.params.id
		await hasilSuaraService.deleteHasilSuara(id, token);
		response.json({
			message: `Delete Hasil Suara with id:${id} success`
		})
	} catch (error) {
		if (error.message === 'Hasil Suara not found') {
			return response.status(404).json({
				status: 'error',
				message: 'Hasil Suara not found'
			});
		}
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		});
	}
}

const getHasilSuaraById = async (request, response) => {
	try {
		const token = request.token
		const id = request.params.id;
		const data = await hasilSuaraService.getHasilSuaraById(id, token);
		return response.status(200).json({
			status: 'success',
			message: 'Get Hasil Suara success',
			data
		});
	} catch (error) {
		if (error.message === 'Hasil Suara not found') {
			return response.status(404).json({
				status: 'error',
				message: 'Hasil Suara not found'
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
	getAllHasilSuara,
	createNewHasilSuara,
	getHasilSuaraById,
	deleteHasilSuara,
	updateHasilSuara
}