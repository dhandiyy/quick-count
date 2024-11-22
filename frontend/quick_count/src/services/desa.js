import axios from "axios";

const baseUrl = 'http://localhost:3001/api/desa'

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

const getById = async (id) => {
	const request = await axios.get(`${baseUrl}/${id}`, config)
	return request.data
}

export default {
	getAll,
	getById,
	setToken
}