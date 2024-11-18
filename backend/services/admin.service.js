const adminRepository = require('../repository/admin.repository')
const {isValidRole} = require('../utils/validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

		const saltRounds = 10
		const passwordHash = await bcrypt.hash(payload.password, saltRounds)

		const newPayload = {
			username: payload.username,
			password: passwordHash,
			nama: payload.nama,
			role: payload.role
		}
		console.log(newPayload)

		return await adminRepository.create(newPayload)
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
			throw new Error('Admin not found');
		}
		return admin;
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const loginAdmin = async (username, password) => {
	try {
		const admin = await adminRepository.getByUsername(username)

		const passwordCorrect = admin === null
			? false
			: await bcrypt.compare(password, admin.password)

		if(!(admin && passwordCorrect)){
			throw new Error('Invalid username and password')
		}else if (!admin) {
			throw new Error('Admin not found')
		}

		const userForToken = {
			username: admin.username,
			id: admin.id,
			role: admin.role
		}
		const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn:60*60})

		return {
			token,
			name: admin.nama,
			username: admin.username
		}
	} catch (error) {
		throw new Error(`Service error: ${error.message}`)
	}
}

const updateAdmin = async (id, payload) => {
	try {
		if (!isValidRole(payload.role)) {
			throw new Error('Role tidak valid')
		}

		const existingAdmin = await adminRepository.getById(id)
		if (!existingAdmin) {
			throw new Error('Admin not found')
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
	loginAdmin
}