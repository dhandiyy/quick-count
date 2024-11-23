import axios from "axios";

const baseUrl = 'http://localhost:3001/api/hasilsuara'

let config = null

const setToken = (newToken) => {
	config = {
		headers: {Authorization: newToken}
	}
}

const getAll = async () => {

	const request = await axios.get(baseUrl)
	return request.data
}

const create = async (newHasilSuara) => {
	const response = await axios.post(baseUrl, newHasilSuara, config)
	return response.data
}

const update = async (id, newHasilSuara) => {
	const request = await axios.put(`${baseUrl}/${id}`, newHasilSuara, config)
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

const upload = async (id, formData) => {
	const request = await axios.post(`${baseUrl}/${id}/upload-bukti`, formData,
		{
			headers : {
				'Content-Type': 'multipart/form-data',
			}
		})
}

export default {
	getAll,
	create,
	update,
	remove,
	getById,
	setToken,
	upload
}