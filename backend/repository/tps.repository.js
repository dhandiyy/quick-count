const prisma = require('../utils/dbConfig');

const getAll = async () => {
	try {
		return await prisma.tps.findMany({
			orderBy: {
				id: 'asc',
			},
			include: {
				Kecamatan: true,
				Desa: true
			}
		});
	} catch (error) {
		throw new Error(`Error getting TPS: ${error}`)
	}
}

const create = async (payload) => {
	try {
		return await prisma.tps.create({
			data: payload,
			include: {
				Kecamatan: true,
				Desa: true
			}
		});
	} catch (error) {
		throw new Error(`Error creating TPS: ${error}`);
	}
}

const remove = async (id) => {
	try {
		return await prisma.tps.delete({
			where: {
				id: Number(id)
			}
		})
	} catch (error) {
		throw new Error(`Error deleting TPS: ${error}`);
	}
}

const getById = async (id) => {
	try {
		return await prisma.tps.findUnique({
			where: {
				id: Number(id)
			},
		})
	} catch (error) {
		throw new Error(`Error getting TPS by ID: ${error.message}`);
	}
}

const update = async (id, payload) => {
	console.log(payload)
	try {
		return await prisma.tps.update({
			where: {
				id: Number(id)
			},
			data: payload,
			include: {
				Kecamatan: true,
				Desa: true
			}
		})
	} catch (error) {
		throw new Error(`Error updating TPS: ${error.message}`);
	}

}

module.exports = {
	getAll,
	create,
	remove,
	getById,
	update
}