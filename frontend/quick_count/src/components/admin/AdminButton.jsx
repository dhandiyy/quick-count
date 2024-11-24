import React from 'react';

export const AdminButton = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className="bg-main hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
		>
			<span className="material-icons">add</span>
			Tambah Admin
		</button>
	);
};
