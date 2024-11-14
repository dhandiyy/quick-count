const tpsModel = require('../models/tps')

const getAllTps = async (request, response) => {
	try {
		//destructuring hanya mengambil data = rows
		const [data] = await tpsModel.getAllTps();
		response.json({
			message: 'Get all TPS success',
			data: data,
		});

	}catch (err) {
		response.status(500).json({
			message: 'Server error',
			serverMessage: err,
		})
	}

}

const createNewTps = async (request, response) => {
	const bodyPayload = request.body;

	try {
		await tpsModel.createNewTps(bodyPayload)
		response.status(201).json({
			message: "Create new TPS success",
			data: bodyPayload
		})
	}catch (err) {
		console.log(err)
		response.status(500).json({
			message: 'Server error',
			serverMessage: err,
		})
	}
}

const updateTps = async (request, response) => {
	const bodyPayload = request.body;
	const idTps = request.params.id;

	try {
		await tpsModel.updateTps(bodyPayload, idTps);
		response.json({
			message: "Update TPS success",
			data: {
				id: idTps,
				...bodyPayload
			}
		})
	}catch (err){
		console.log(err)
		response.status(500).json({
			message: 'Server error',
			serverMessage: err,
		})
	}
}

const deleteTps = async (request, response) => {
	const idTps = request.params.id

	try {
		await tpsModel.deleteTps(idTps);
		response.json({
			message: "Delete TPS success"
		})
	}catch (err) {
		response.status(500).json({
			message: 'Server error',
			serverMessage: err,
		})
	}

}

module.exports = {
	getAllTps,
	createNewTps,
	updateTps,
	deleteTps
}