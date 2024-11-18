const tpsRepository = require('../repository/tps.repository')

const getAllTps = async (token) => {
	try {
		if (!token) {
			throw new Error('token invalid')
		}
		return await tpsRepository.getAll();
	} catch (error) {
		throw new Error(error);
	}
}

const createNewTps = async (payload, token) => {
	try {
		if (!token) {
			throw new Error('token invalid')
		}
		return await tpsRepository.create(payload)
	} catch (error) {
		throw new Error(error);
	}
}

const deleteTps = async (id, token) => {
	try {
		if (!token) {
			throw new Error('token invalid')
		}

		const tps = await tpsRepository.getById(id)

		if (!tps) {
			throw new Error('Tps no found');
		}
		return await tpsRepository.remove(id)
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const getTpsById = async (id, token) => {
	try {
		if (!token) {
			throw new Error('token invalid')
		}
		const tps = await tpsRepository.getById(id)
		if (!tps) {
			throw new Error('Tps no found');
		}
		return tps;
	} catch (error) {
		throw new Error(error.message);
	}
}

const updateTps = async (id, payload, token) => {
	try {
		if (!token) {
			throw new Error('token invalid')
		}

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