import axios from "axios";
const baseUrl = `${import.meta.env.VITE_API_URL}/login`

const login = async (credential) => {
	const response = await axios.post(baseUrl, credential)
	return response.data.data
}

export default {login}