import React from 'react';
import { AdminButton } from './AdminButton.jsx';
import { AdminForm } from './AdminForm';

export const AdminModal = ({ onSubmit }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const handleSubmit = (formData) => {
		onSubmit?.(formData);
		setIsOpen(false);
	};

	if (!isOpen) {
		return <AdminButton onClick={() => setIsOpen(true)} />;
	}

	return (
		<>
			{/* Modal Backdrop */}
			<div
				className="fixed inset-0 bg-black bg-opacity-50 z-40"
				onClick={() => setIsOpen(false)}
			/>

			{/* Modal Content */}
			<div className="fixed inset-0 z-50 overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-md">
						<div className="p-6">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold">Tambah Admin Baru</h2>
								<button
									onClick={() => setIsOpen(false)}
									className="text-gray-400 hover:text-gray-500"
								>
									<span className="material-icons">close</span>
								</button>
							</div>

							<AdminForm
								onSubmit={handleSubmit}
								onClose={() => setIsOpen(false)}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};