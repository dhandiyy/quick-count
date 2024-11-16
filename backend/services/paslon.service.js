const paslonRepository = require('../repository/paslon.repository')

//validasi

const getAllPaslon = async () => {
	try {
		return await paslonRepository.getAll();
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const createNewPaslon = async (payload) => {
	try {
		return await paslonRepository.create(payload)
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const deletePaslon = async (id) => {
	try {
		return await paslonRepository.remove(id)
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const getPaslonById = async (id) => {
	try {
		const paslon = await paslonRepository.getById(id)
		if (!paslon) {
			throw new Error('Paslon no found');
		}
		return paslon;
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const updatePaslon = async (id, payload) => {
	try {
		const existingPaslon = await paslonRepository.getById(id)
		if (!existingPaslon) {
			throw new Error('Paslon not found')
		}
		return await paslonRepository.update(id, payload)
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}


module.exports = {
	getAllPaslon,
	createNewPaslon,
	deletePaslon,
	getPaslonById,
	updatePaslon,
}