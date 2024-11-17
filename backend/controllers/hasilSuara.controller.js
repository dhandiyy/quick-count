const hasilSuaraService = require('../services/hasilSuara.service')

const getAllHasilSuara = async (request, response) => {
	try {

		const data = await hasilSuaraService.getAllHasilSuara();
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

const createNewHasilSuara = async (request, response) => {
	try {
		const payload = request.body;
		await hasilSuaraService.createNewHasilSuara(payload)
		response.status(201).json({
			message: "Create new Hasil Suara success",
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

const updateHasilSuara = async (request, response) => {
	try {
		const payload = request.body;
		const id = request.params.id;
		await hasilSuaraService.updateHasilSuara(id, payload);
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
		const id = request.params.id
		await hasilSuaraService.deleteHasilSuara(id);
		response.json({
			message: `Delete Hasil Suara with ${id} success`
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

const getHasilSuaraById = async (req, res) => {
	try {
		const id = req.params.id;
		const data = await hasilSuaraService.getHasilSuaraById(id);
		return res.status(200).json({
			status: 'success',
			message: 'Get Hasil Suara success',
			data
		});
	} catch (error) {
		if (error.message === 'Hasil Suara not found') {
			return res.status(404).json({
				status: 'error',
				message: 'Hasil Suara not found'
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
	getAllHasilSuara,
	createNewHasilSuara,
	getHasilSuaraById,
	deleteHasilSuara,
	updateHasilSuara
}