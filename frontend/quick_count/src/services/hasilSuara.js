import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/hasilsuara`

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

const accept = async (id) => {
	const request = await axios.put(`${baseUrl}/accept/${id}`,{}, config)
	return request.data
}

const reject = async (id, newHasilSuara) => {
	const request = await axios.put(`${baseUrl}/reject/${id}`, newHasilSuara, config)
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
	upload,
	accept,
	reject
}