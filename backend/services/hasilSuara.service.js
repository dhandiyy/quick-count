const hasilSuaraRepository = require('../repository/hasilSuara.repository')
const tpsService = require('../services/tps.service')
const adminService = require('../services/admin.service')

//validasi

const getAllHasilSuara = async () => {
	try {
		return await hasilSuaraRepository.getAll();
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const createNewHasilSuara = async (payload) => {
	try {
		const tps = await tpsService.getTpsById(payload.tps_id)
		const admin = await adminService.getAdminById(payload.created_by)
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
		throw new Error(`Service error: ${error.message}`);
	}
}

const deleteHasilSuara = async (id) => {
	try {
		return await hasilSuaraRepository.remove(id)
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const getHasilSuaraById = async (id) => {
	try {
		const hasilSuara = await hasilSuaraRepository.getById(id)
		if (!hasilSuara) {
			throw new Error('Hasil Suara not found');
		}
		return hasilSuara;
	} catch (error) {
		throw new Error(`Service error: ${error.message}`);
	}
}

const updateHasilSuara = async (id, payload) => {
	try {
		const existingHasilSuara = await hasilSuaraRepository.getById(id)
		if (!existingHasilSuara) {
			throw new Error('Hasil Suara not found')
		}
		const tps = await tpsService.getTpsById(payload.tps_id)
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