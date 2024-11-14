const dbPool = require('../utils/dbConfig')

const getAllTps = () => {
	const SQLQuery = 'SELECT * FROM tps';

	return dbPool.execute(SQLQuery);
}

const createNewTps = (body) => {
	const SQLQuery = 'INSERT INTO tps (nomer_tps, jumlah_dpt, kecamatan_id, desa_id) VALUES (?, ?, ?, ?)';

	return dbPool.execute(SQLQuery, [body.nomer_tps, body.jumlah_dpt, body.kecamatan_id, body.desa_id]);
}

const updateTps = (body, idTps) => {
	const SQLQuery = 'UPDATE tps SET nomer_tps=?, jumlah_dpt=?, kecamatan_id=?, desa_id=? WHERE id=?';

	return dbPool.execute(SQLQuery, [body.nomer_tps, body.jumlah_dpt, body.kecamatan_id, body.desa_id, idTps])
}

const deleteTps = (idTps) => {
	const SQLQuery = 'DELETE FROM tps WHERE id=?'

	return dbPool.execute(SQLQuery, [idTps])
}

module.exports = {
	getAllTps,
	createNewTps,
	updateTps,
	deleteTps,
}