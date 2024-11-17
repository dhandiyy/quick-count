const adminService = require('../services/admin.service')


const login = async (request, response) => {
	try {
		const {username, password} = request.body
		const adminValidated = await adminService.getAdminByUsername(username, password)

		if(!adminValidated){
			return response.status(401).json({
				error: 'invalid username or password'
			})
		}

		return response.status(200).json({
			data: adminValidated
		})
	} catch (error) {
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		})
	}
}

const getAllAdmin = async (request, response) => {
	try {
		const data = await adminService.getAllAdmin();
		return response.status(200).json({
			message: 'Get all Admin success',
			data: data,
		});

	} catch (error) {
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		})
	}

}

const createNewAdmin = async (request, response) => {
	try {
		const payload = request.body;
		await adminService.createNewAdmin(payload)
		response.status(201).json({
			message: "Create new Admin success",
			data: payload
		})
	} catch (error) {
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		})
	}
}

const updateAdmin = async (request, response) => {
	try {
		const payload = request.body;
		const id = request.params.id;
		await adminService.updateAdmin(id, payload);
		response.json({
			message: "Update Admin success",
			data: {
				id: id,
				...payload
			}
		})
	} catch (error) {
		if (error.message === 'Admin not found') {
			return response.status(404).json({
				status: 'error',
				message: 'Admin not found'
			});
		}
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		});
	}
}


const deleteAdmin = async (request, response) => {
	try {
		const id = request.params.id
		await adminService.deleteAdmin(id);
		response.json({
			message: `Delete Admin with ${id} success`
		})
	} catch (error) {
		if (error.message === 'Admin not found') {
			return response.status(404).json({
				status: 'error',
				message: 'Admin not found'
			});
		}
		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		});
	}
}

const getAdminById = async (req, res) => {
	try {
		const id = req.params.id;
		const data = await adminService.getAdminById(id);
		return res.status(200).json({
			status: 'success',
			message: 'Get Admin success',
			data
		});
	} catch (error) {
		if (error.message === 'Admin not found') {
			return res.status(404).json({
				status: 'error',
				message: 'Admin not found'
			});
		}
		return res.status(500).json({
			status: 'error',
			message: 'Internal server error',
			error: error.message
		});
	}
};

module.exports = {
	getAllAdmin,
	createNewAdmin,
	deleteAdmin,
	getAdminById,
	updateAdmin,
	login
}