const adminRepository = require('../repository/admin.repository')
const {ROLE, isValidRole} = require('../utils/validator')

//validasi

const getAllAdmin = async () => {
	try {
		return await adminRepository.getAll();
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const createNewAdmin = async (payload) => {
	try {
		if (!isValidRole(payload.role)) {
			throw new Error('Role tidak valid')
		}

		return await adminRepository.create(payload)
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const deleteAdmin = async (id) => {
	try {
		return await adminRepository.remove(id)
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const getAdminById = async (id) => {
	try {
		const admin = await adminRepository.getById(id)
		if (!admin) {
			throw new Error('Admin no found');
		}
		return admin;
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const updateAdmin = async (id, payload) => {
	try {
		if (!isValidRole(payload.role)) {
			throw new Error('Role tidak valid')
		}

		const existingAdmin = await adminRepository.getById(id)
		if (!existingAdmin) {
			throw new Error('Paslon not found')
		}
		return await adminRepository.update(id, payload)
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}


module.exports = {
	getAllAdmin,
	createNewAdmin,
	deleteAdmin,
	getAdminById,
	updateAdmin,
}