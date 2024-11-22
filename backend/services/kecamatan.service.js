const kecamatanRepository = require('../repository/kecamatan.repository')

const getAllKecamatan = async () => {
	try {
		return await kecamatanRepository.getAll();
	} catch (error) {
		throw new Error(error);
	}
}


const getKecamatanById = async (id) => {
	try {
		const tps = await kecamatanRepository.getById(id)
		if (!tps) {
			throw new Error('Kecamatan no found');
		}
		return tps;
	} catch (error) {
		throw new Error(error.message);
	}
}

module.exports = {
	getAllKecamatan,
	getKecamatanById,
}