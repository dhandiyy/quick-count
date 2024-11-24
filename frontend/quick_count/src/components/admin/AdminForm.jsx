import React from 'react';

export const AdminForm = ({ onSubmit, onClose }) => {
	const [formData, setFormData] = React.useState({
		username: '',
		password: '',
		nama: '',
		role: 'ADMIN'
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit?.(formData);
		// Reset form
		setFormData({
			username: '',
			password: '',
			nama: '',
			role: 'ADMIN'
		});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<label className="text-sm font-medium">Username</label>
				<input
					type="text"
					name="username"
					value={formData.username}
					onChange={handleChange}
					className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
					required
				/>
			</div>

			<div className="space-y-2">
				<label className="text-sm font-medium">Password</label>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
					required
				/>
			</div>

			<div className="space-y-2">
				<label className="text-sm font-medium">Nama</label>
				<input
					type="text"
					name="nama"
					value={formData.nama}
					onChange={handleChange}
					className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
					required
				/>
			</div>

			<div className="space-y-2">
				<label className="text-sm font-medium">Role</label>
				<select
					name="role"
					value={formData.role}
					onChange={handleChange}
					className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
				>
					<option value="ADMIN">ADMIN</option>
					<option value="SUPER_ADMIN">SUPER_ADMIN</option>
				</select>
			</div>

			<div className="flex justify-end gap-4 mt-6">
				<button
					type="button"
					onClick={onClose}
					className="px-4 py-2 border rounded-lg hover:bg-gray-100"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="px-4 py-2 bg-main text-white rounded-lg hover:bg-green-700"
				>
					Save
				</button>
			</div>
		</form>
	);
};