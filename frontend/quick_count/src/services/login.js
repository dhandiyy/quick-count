import axios from "axios";
const baseUrl = 'https://quick-count-3i5rcip2w-dhandiyys-projects.vercel.app/api/login'

const login = async (credential) => {
	const response = await axios.post(baseUrl, credential)
	return response.data.data
}

export default {login}