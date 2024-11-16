const ROLES = {
	ADMIN: 'ADMIN',
	SUPER_ADMIN: 'SUPER_ADMIN'
}

const isValidRole = (role) => {
	return Object.values(ROLES).includes(role)
}

module.exports = {
	ROLES,
	isValidRole
}