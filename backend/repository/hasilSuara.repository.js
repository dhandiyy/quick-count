const prisma = require('../utils/dbConfig');

const getAll = async () => {
	try {
		return await prisma.hasilSuara.findMany({
			orderBy: {
				id: 'asc',
			},
			include: {
				Tps: {
					include: {
						Kecamatan: true,
						Desa: true
					}
				},
				Admin: true
			}
		});
	} catch (error) {
		throw new Error(`Error getting Hasil Suara: ${error}`)
	}
}

const create = async (payload) => {
	try {
		return await prisma.hasilSuara.create({
			data: payload,
			include: {
				Tps: true,
				Admin: true
			}
		});

	} catch (error) {
		throw new Error(`Error creating Hasil Suara: ${error}`);
	}
}

const remove = async (id) => {
	try {
		return await prisma.hasilSuara.delete({
			where: {
				id: Number(id)
			}
		})
	} catch (error) {
		throw new Error(`Error deleting Hasil Suara: ${error}`);
	}
}

const getById = async (id) => {
	try {
		return await prisma.hasilSuara.findUnique({
			where: {
				id: Number(id)
			},
		})
	} catch (error) {
		throw new Error(`Error getting Hasil Suara by ID: ${error.message}`);
	}
}

const update = async (id, payload) => {
	try {
		return await prisma.hasilSuara.update({
			where: {
				id: Number(id)
			},
			data: payload,
			include: {
				Tps: true,
				Admin: true
			}
		})
	} catch (error) {
		throw new Error(`Error updating Hasil Suara: ${error.message}`);
	}
}

const uploadBuktiFoto = async (id, filename) => {
	try {
		return await prisma.hasilSuara.update({
			where: { id: parseInt(id) },
			data: {
				bukti_foto: filename,
				updated_at: new Date()
			}
		});
	} catch (error) {
		throw new Error(`Error uploading bukti foto: ${error}`)
	}
}

module.exports = {
	getAll,
	create,
	remove,
	getById,
	update,
	uploadBuktiFoto,
}