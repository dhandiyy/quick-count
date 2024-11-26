import axios from "axios";
const baseUrl = 'https://newapiku.hasilsuarafinal.web.id/api/login'

const login = async (credential) => {
	const response = await axios.post(baseUrl, credential)
	return response.data.data
}

export default {login}