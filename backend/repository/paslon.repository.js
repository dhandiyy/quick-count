const prisma = require('../utils/dbConfig');

const getAll = async () => {
	try {
		return await prisma.paslon.findMany({
			orderBy: {
				id: 'asc',
			}
		});
	} catch (error) {
		throw new Error(`Error getting Paslon: ${error}`)
	}
}

const create = async (payload) => {
	try {
		return await prisma.paslon.create({
			data: payload
		});

	} catch (error) {
		throw new Error(`Error creating Paslon: ${error}`);
	}
}

const remove = async (id) => {
	try {
		return await prisma.paslon.delete({
			where: {
				id: Number(id)
			}
		})
	} catch (error) {
		throw new Error(`Error deleting Paslon: ${error}`);
	}
}

const getById = async (id) => {
	try {
		return await prisma.paslon.findUnique({
			where: {
				id: Number(id)
			},
		})
	} catch (error) {
		throw new Error(`Error getting Paslon by ID: ${error.message}`);
	}
}

const update = async (id, payload) => {
	console.log(payload)
	try {
		return await prisma.paslon.update({
			where: {
				id: Number(id)
			},
			data: payload
		})
	} catch (error) {
		throw new Error(`Error updating Paslon: ${error.message}`);
	}

}

module.exports = {
	getAll,
	create,
	remove,
	getById,
	update,
}