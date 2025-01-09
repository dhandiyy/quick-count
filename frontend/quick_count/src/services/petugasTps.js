import axios from "axios";

const baseUrl = 'http://localhost:3001/api/admin'

// let config = null
//
// const setToken = (newToken) => {
// 	config = {
// 		headers: {Authorization: newToken}
// 	}
// }

const getAll = async () => {
	const request = await axios.get(baseUrl)
	return request.data
}

const create = async (newTps) => {
	const response = await axios.post(baseUrl, newTps)
	return response.data
}

const update = async (id, newTps) => {
	const request = await axios.put(`${baseUrl}/${id}`, newTps)
	return request.data
}

const remove = async (id) => {
	const request = await axios.delete(`${baseUrl}/${id}`)
	return request.data
}

const getById = async (id) => {
	const request = await axios.get(`${baseUrl}/${id}`)
	return request.data
}

export default {
	getAll,
	create,
	update,
	remove,
	getById,
}