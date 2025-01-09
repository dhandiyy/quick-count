import axios from "axios";

const baseUrl = 'http://localhost:3001/api/desa'

const getAll = async () => {
	const request = await axios.get(baseUrl)
	return request.data
}

const getById = async (id) => {
	const request = await axios.get(`${baseUrl}/${id}`)
	return request.data
}

export default {
	getAll,
	getById,
}