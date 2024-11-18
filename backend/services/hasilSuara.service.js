const hasilSuaraRepository = require('../repository/hasilSuara.repository')
const tpsService = require('../services/tps.service')
const adminService = require('../services/admin.service')

const getAllHasilSuara = async (token) => {
	try {
		if (!token) {
			throw new Error('token invalid')
		}
		return await hasilSuaraRepository.getAll();
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const createNewHasilSuara = async (request) => {
	try {
		const payload = request.body
		const token = request.token
		const tps = await tpsService.getTpsById(payload.tps_id, token)
		if(!request.token){
			throw new Error('token invalid')
		}
		const admin = await adminService.getAdminById(token.id)

		const suara = {
			tps_id: tps.id,
			jumlah_suara_paslon1: payload.jumlah_suara_paslon1,
			jumlah_suara_paslon2: payload.jumlah_suara_paslon2,
			jumlah_suara_tidak_sah: payload.jumlah_suara_tidak_sah,
			total_suara_masuk: payload.total_suara_masuk,
			status: payload.status,
			created_by: admin.id,
			approval: payload.approval,
		}

		return await hasilSuaraRepository.create(suara)
	} catch (error) {
		throw new Error(error);
	}
}

const deleteHasilSuara = async (id, token) => {
	try {
		if (!token) {
			throw new Error('token invalid')
		}
		await getHasilSuaraById(id, token)
		return await hasilSuaraRepository.remove(id)
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const getHasilSuaraById = async (id, token) => {
	try {
		if (!token) {
			throw new Error('token invalid')
		}
		const hasilSuara = await hasilSuaraRepository.getById(id)
		if (!hasilSuara) {
			throw new Error('Hasil Suara not found');
		}
		return hasilSuara;
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const updateHasilSuara = async (id, payload, token) => {
	try {
		if (!token) {
			throw new Error('token invalid')
		}

		const existingHasilSuara = await hasilSuaraRepository.getById(id)

		if (!existingHasilSuara) {
			throw new Error('Hasil Suara not found')
		}
		const tps = await tpsService.getTpsById(payload.tps_id, token)
		const admin = await adminService.getAdminById(payload.created_by)

		const newHasilSuara = {
			tps_id: tps.id,
			jumlah_suara_paslon1: payload.jumlah_suara_paslon1,
			jumlah_suara_paslon2: payload.jumlah_suara_paslon2,
			jumlah_suara_tidak_sah: payload.jumlah_suara_tidak_sah,
			total_suara_masuk: payload.total_suara_masuk,
			status: payload.status,
			created_by: admin.id,
			approval: payload.approval,
		}


		return await hasilSuaraRepository.update(id, newHasilSuara)
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

module.exports = {
	getAllHasilSuara,
	createNewHasilSuara,
	deleteHasilSuara,
	getHasilSuaraById,
	updateHasilSuara
}