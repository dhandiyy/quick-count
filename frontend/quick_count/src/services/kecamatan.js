import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/kecamatan`

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