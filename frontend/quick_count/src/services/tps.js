import axios from "axios";

const baseUrl = 'https://newapiku.hasilsuarafinal.web.id/api/tps'

let config = null

const setToken = (newToken) => {
	config = {
		headers: {Authorization: newToken}
	}
}

const getAll = async () => {

	const request = await axios.get(baseUrl, config)
	return request.data
}

const create = async (newTps) => {
	const response = await axios.post(baseUrl, newTps, config)
	return response.data
}

const update = async (id, newTps) => {
	const request = await axios.put(`${baseUrl}/${id}`, newTps, config)
	return request.data
}

const remove = async (id) => {
	const request = await axios.delete(`${baseUrl}/${id}`, config)
	return request.data
}

const getById = async (id) => {
	const request = await axios.get(`${baseUrl}/${id}`, config)
	return request.data
}

export default {
	getAll,
	create,
	update,
	remove,
	getById,
	setToken
}