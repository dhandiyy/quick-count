import React, {useState} from 'react';
import {AlertCircle, Building, Check, HelpCircle, LayoutDashboard, Menu, UserCheck, Users, Vote} from 'lucide-react';

const Sidebar = ({isOpen, toggleSidebar}) => {
	const menuItems = [
		{title: 'Dashboard', icon: <LayoutDashboard size={20}/>, id: 'dashboard'},
		{title: 'Hasil Suara', icon: <HelpCircle size={20}/>, id: 'hasil-suara'},
		{title: 'TPS', icon: <Building size={20}/>, id: 'tps'},
		{title: 'Admin', icon: <Users size={20}/>, id: 'admin'},
	];

	const scrollToSection = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({behavior: 'smooth'});
		}
	};

	return (
		<div
			className={`h-screen fixed left-0 top-0 bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
			<div className="flex items-center justify-between p-4 border-b bg-main">
				{isOpen && <h1 className="text-2xl font-bold text-custom-white font-header">Quick Count</h1>}
				<button onClick={toggleSidebar} className="p-1 rounded">
					<Menu className={"text-custom-white"} size={20}/>
				</button>
			</div>

			<nav className="mt-4">
				<ul className="space-y-2">
					{menuItems.map((item) => (
						<li key={item.title}>
							<button
								onClick={() => scrollToSection(item.id)}
								className="w-full px-4 py-2 flex items-center space-x-3 text-custom-black hover:bg-gray-100 transition-colors duration-200"
							>
								{item.icon}
								{isOpen && <span>{item.title}</span>}
							</button>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

const DataTable = ({title, data, showVerify = false}) => {
	return (
		<div className="bg-white rounded-lg shadow p-6 mb-12">
			<h2 className="text-xl font-semibold mb-4">{title}</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full">
					<thead>
					<tr className="bg-gray-50">
						{Object.keys(data[0]).map((header) => (
							<th key={header}
							    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								{header}
							</th>
						))}
						{showVerify && <th className="px-6 py-3 text-right">Action</th>}
					</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
					{data.map((row, index) => (
						<tr key={index} className="hover:bg-gray-50">
							{Object.values(row).map((cell, cellIndex) => (
								<td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{cell}
								</td>
							))}
							{showVerify && (
								<td className="px-6 py-4 text-right">
									<button
										className="text-green-600 hover:text-green-800 flex items-center space-x-1 ml-auto">
										<Check size={16}/>
										<span>Verify</span>
									</button>
								</td>
							)}
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const SummaryCard = ({title, stats, icon: Icon, bgColor = "bg-white"}) => {
	return (
		<div className={`${bgColor} rounded-lg shadow p-6 flex-1`}>
			<div className="flex items-start justify-between">
				<div>
					<p className="text-gray-500 text-sm font-medium">{title}</p>
					<div className="mt-4 space-y-2">
						{stats.map((stat, index) => (
							<div key={index} className="flex items-center">
								<span className="text-2xl font-bold text-gray-800">{stat.value}</span>
								<span className="ml-2 text-sm text-gray-500">{stat.label}</span>
							</div>
						))}
					</div>
				</div>
				<div className="p-3 rounded-full bg-blue-50">
					<Icon className="h-6 w-6 text-blue-500"/>
				</div>
			</div>
		</div>
	);
};

const HomeSuperAdmin = () => {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const summaryData = {
		totalVotes: {
			total: 1250,
			needAction: 45
		},
		candidates: {
			candidate1: 680,
			candidate2: 570
		},
		adminCount: 12
	};

	// Sample data for tables
	const unverifiedVotes = [
		{ID: 1, TPS: "TPS-001", Total_Suara: 250, Status: "Pending"},
		{ID: 2, TPS: "TPS-002", Total_Suara: 300, Status: "Pending"},
		// Add more data as needed
	];

	const verifiedVotes = [
		{ID: 1, TPS: "TPS-003", Total_Suara: 275, Status: "Verified"},
		{ID: 2, TPS: "TPS-004", Total_Suara: 325, Status: "Verified"},
		// Add more data as needed
	];

	const tpsData = [
		{ID: 1, Nama_TPS: "TPS-001", Lokasi: "Jl. Merdeka No. 1", Petugas: "John Doe"},
		{ID: 2, Nama_TPS: "TPS-002", Lokasi: "Jl. Sudirman No. 2", Petugas: "Jane Smith"},
		// Add more data as needed
	];

	const adminData = [
		{ID: 1, Nama: "Admin 1", Email: "admin1@example.com", Role: "Super Admin"},
		{ID: 2, Nama: "Admin 2", Email: "admin2@example.com", Role: "TPS Admin"},
		// Add more data as needed
	];

	return (
		<div className="flex bg-gray-100 min-h-screen">
			<Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
			<main className={`flex-1 p-8 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
				<div id="dashboard" className="mb-8">
					<h1 className="text-2xl font-bold mb-6 text-main">Dashboard</h1>

					{/* Summary Cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
						<SummaryCard
							title="Total Hasil Suara"
							stats={[
								{value: summaryData.totalVotes.total, label: "Total Suara"},
								{value: summaryData.totalVotes.needAction, label: "Butuh Verifikasi"}
							]}
							icon={Vote}
						/>

						<SummaryCard
							title="Perolehan Suara"
							stats={[
								{value: summaryData.candidates.candidate1, label: "Paslon 1"},
								{value: summaryData.candidates.candidate2, label: "Paslon 2"}
							]}
							icon={AlertCircle}
							bgColor="bg-white"
						/>

						<SummaryCard
							title="Total Admin"
							stats={[
								{value: summaryData.adminCount, label: "Admin Terdaftar"}
							]}
							icon={UserCheck}
							bgColor="bg-white"
						/>
					</div>
				</div>

				{/* Rest of the component remains the same... */}
				<div id="hasil-suara" className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-main ">Hasil Suara</h2>
					<DataTable title="Hasil Suara Belum Tervalidasi" data={unverifiedVotes} showVerify={true}/>
					<DataTable title="Hasil Suara Tervalidasi" data={verifiedVotes} showVerify={false}/>
				</div>

				<div id="tps" className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-main ">TPS</h2>
					<DataTable title="Data TPS" data={tpsData}/>
				</div>

				<div id="admin" className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-main ">Admin</h2>
					<DataTable title="Data Admin" data={adminData}/>
				</div>
			</main>
		</div>
	);
};

export default HomeSuperAdmin;