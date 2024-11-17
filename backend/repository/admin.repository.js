const prisma = require('../utils/dbConfig');

const getAll = async () => {
	try {
		return await prisma.admin.findMany({
			orderBy: {
				id: 'asc',
			}
		});
	} catch (error) {
		throw new Error(`Error getting Admin: ${error}`)
	}
}

const create = async (payload) => {
	try {
		return await prisma.admin.create({
			data: payload
		});

	} catch (error) {
		throw new Error(`Error creating Admin: ${error}`);
	}
}

const remove = async (id) => {
	try {
		return await prisma.admin.delete({
			where: {
				id: Number(id)
			}
		})
	} catch (error) {
		throw new Error(`Error deleting Admin: ${error}`);
	}
}

const getById = async (id) => {
	try {
		return await prisma.admin.findUnique({
			where: {
				id: Number(id)
			},
		})
	} catch (error) {
		throw new Error(`Error getting Admin by ID: ${error.message}`);
	}
}

const getByUsername = async (username) => {
	try {
		return await prisma.admin.findUnique({
			where: {
				username: username
			}
		})
	} catch (error) {
		throw new Error(`Error getting Admin by username: ${error.message}`)
	}
}

const update = async (id, payload) => {
	console.log(payload)
	try {
		return await prisma.admin.update({
			where: {
				id: Number(id)
			},
			data: payload
		})
	} catch (error) {
		throw new Error(`Error updating Admin: ${error.message}`);
	}

}

module.exports = {
	getAll,
	create,
	remove,
	getById,
	update,
	getByUsername
}