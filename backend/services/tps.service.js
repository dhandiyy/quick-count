const tpsRepository = require('../repository/tps.repository')

//validasi

const getAllTps = async () => {
	try {
		return await tpsRepository.getAll();
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const createNewTps = async (payload) => {
	try {
		return await tpsRepository.create(payload)

	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const deleteTps = async (id) => {
	try {
		return await tpsRepository.remove(id)
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const getTpsById = async (id) => {
	try {
		const tps = await tpsRepository.getById(id)
		if (!tps) {
			throw new Error('Tps no found');
		}
		return tps;
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const updateTps = async (id, payload) => {
	try {
		const existingTps = await tpsRepository.getById(id)
		if (!existingTps) {
			throw new Error('Tps not found')
		}
		return await tpsRepository.update(id, payload)
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}


module.exports = {
	getAllTps,
	createNewTps,
	deleteTps,
	getTpsById,
	updateTps,
}