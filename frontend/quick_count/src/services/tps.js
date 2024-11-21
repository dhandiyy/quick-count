import axios from "axios";

const baseUrl = 'http://localhost:3001/api/tps'

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

const create = async (newTps, token) => {
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
}

export default {
	getAll,
	create,
	update,
	remove,
	getById,
	setToken
}