import axios from "axios";
const baseUrl = 'http://localhost:3001/api/login'

const login = async (credential) => {
	const response = await axios.post(baseUrl, credential)
	return response.data.data
}

export default {login}