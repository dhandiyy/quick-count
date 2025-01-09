// UnderMaintenance.js
import React from 'react';

const UnderMaintenance = () => {
	return (
		<div style={styles.container}>
			<div style={styles.content}>
				<h1 style={styles.header}>Website Under Maintenance</h1>
				<p style={styles.message}>
					We are currently performing scheduled maintenance. We should be back online shortly. Thank you for your patience.
				</p>
			</div>
		</div>
	);
};

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		backgroundColor: '#f8f9fa',
	},
	content: {
		textAlign: 'center',
		padding: '20px',
		border: '1px solid #ccc',
		borderRadius: '10px',
		backgroundColor: '#ffffff',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	},
	header: {
		fontSize: '2em',
		margin: '0 0 20px 0',
		color: '#333',
	},
	message: {
		fontSize: '1.2em',
		color: '#666',
	},
};

export default UnderMaintenance;
