const desaRepository = require('../repository/desa.repository')

const getAllDesa = async () => {
	try {
		return await desaRepository.getAll();
	} catch (error) {
		throw new Error(error);
	}
}


const getDesaById = async (id) => {
	try {
		const tps = await desaRepository.getById(id)
		if (!tps) {
			throw new Error('Desa no found');
		}
		return tps;
	} catch (error) {
		throw new Error(error.message);
	}
}

module.exports = {
	getAllDesa,
	getDesaById,
}