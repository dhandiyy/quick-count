const prisma = require('../utils/dbConfig');

const getAll = async () => {
	try {
		return await prisma.desa.findMany({
			orderBy: {
				id: 'asc',
			},
		});
	} catch (error) {
		throw new Error(`Error getting Hasil Suara: ${error}`)
	}
}


const getById = async (id) => {
	try {
		return await prisma.desa.findUnique({
			where: {
				id: Number(id)
			},
		})
	} catch (error) {
		throw new Error(`Error getting Hasil Suara by ID: ${error.message}`);
	}
}


module.exports = {
	getAll,
	getById,
}