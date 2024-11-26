import React, {useEffect, useState} from 'react';
import {
	AlertCircle,
	Building,
	CheckCheck,
	HelpCircle,
	LayoutDashboard,
	Menu,
	Trash2,
	UserCheck,
	Users,
	Vote,
	X
} from 'lucide-react';
import {useDispatch, useSelector} from "react-redux";
import {setTps} from "../reducers/tpsReducer.js";
import {setHasilSuara} from "../reducers/hasilSuaraReducer.js";
import {setPetugasTps} from "../reducers/petugasReducer.js";
import hasilSuaraService from "../services/hasilSuara.js";
import petugasTpsService from "../services/petugasTps.js"
import tpsService from "../services/tps.js";
import {AdminModal} from "../components/admin/AdminModal.jsx";


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

// const DataTable = ({title, data, showVerify = false}) => {
// 	return (
// 		<div className="bg-white rounded-lg shadow p-6 mb-12">
// 			<h2 className="text-xl font-semibold mb-4">{title}</h2>
// 			<div className="overflow-x-auto">
// 				<table className="min-w-full">
// 					<thead>
// 					<tr className="bg-gray-50">
// 						{Object.keys(data[0]).map((header) => (
// 							<th key={header}
// 							    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// 								{header}
// 							</th>
// 						))}
// 						{showVerify && <th className="px-6 py-3 text-right">Action</th>}
// 					</tr>
// 					</thead>
// 					<tbody className="divide-y divide-gray-200">
// 					{data.map((row, index) => (
// 						<tr key={index} className="hover:bg-gray-50">
// 							{Object.values(row).map((cell, cellIndex) => (
// 								<td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// 									{cell}
// 								</td>
// 							))}
// 							{showVerify && (
// 								<td className="px-6 py-4 text-right">
// 									<button
// 										className="text-green-600 hover:text-green-800 flex items-center space-x-1 ml-auto">
// 										<Check size={16}/>
// 										<span>Verify</span>
// 									</button>
// 								</td>
// 							)}
// 						</tr>
// 					))}
// 					</tbody>
// 				</table>
// 			</div>
// 		</div>
// 	);
// };

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
	const dispatch = useDispatch();

	// Redux selectors
	const hasilSuara = useSelector(state => state.hasilSuara);
	const tps = useSelector(state => state.tps);
	const admin = useSelector(state => state.admin);
	const petugasTps = useSelector(state => state.petugasTps);

	// Local state
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [stats, setStats] = useState({
		totalSuaraTerverifikasi: 0,
		totalSuaraBelumTerverifikasi: 0,
		suaraPaslon: [0, 0]
	});

	// Initialize services with token
	useEffect(() => {
		hasilSuaraService.setToken(admin.token);
		tpsService.setToken(admin.token);
		fetchAllData();

		// Set up interval untuk fetch data setiap 2 menit = 2*60*1000
		const intervalId = setInterval(fetchAllData, 60000);

		// Cleanup interval saat component unmount
		return () => clearInterval(intervalId);
	}, []);

	// Combined fetch function
	const fetchAllData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			await Promise.all([
				fetchTPS(),
				fetchHasilSuara(),
				fetchPetugasTps()
			]);
		} catch (err) {
			setError(err.message || 'Terjadi kesalahan saat mengambil data');
		} finally {
			setIsLoading(false);
		}
	};

	const fetchTPS = async () => {
		try {
			const {data} = await tpsService.getAll();
			dispatch(setTps(data));
		} catch (error) {
			console.error('Error fetching TPS:', error);
			throw error;
		}
	};

	const fetchHasilSuara = async () => {
		try {
			const {data} = await hasilSuaraService.getAll();
			dispatch(setHasilSuara(data));

			// Calculate statistics
			const terverifikasi = data
				.filter(hs => hs.approval === "ACCEPT")
				.reduce((sum, hs) => sum + hs.jumlah_suara_paslon1 + hs.jumlah_suara_paslon2 + hs.jumlah_suara_tidak_sah, 0);

			const belumTerverifikasi = data
				.filter(hs => hs.approval === "PENDING")
				.reduce((sum, hs) => sum + hs.jumlah_suara_paslon1 + hs.jumlah_suara_paslon2 + hs.jumlah_suara_tidak_sah, 0);

			const totalSuaraPaslon1 = data.reduce((sum, hs) => sum + hs.jumlah_suara_paslon1, 0);
			const totalSuaraPaslon2 = data.reduce((sum, hs) => sum + hs.jumlah_suara_paslon2, 0);

			setStats({
				totalSuaraTerverifikasi: terverifikasi,
				totalSuaraBelumTerverifikasi: belumTerverifikasi,
				suaraPaslon: [totalSuaraPaslon1, totalSuaraPaslon2]
			});
		} catch (error) {
			console.error('Error fetching hasil suara:', error);
			throw error;
		}
	};

	const fetchPetugasTps = async () => {
		try {
			const {data} = await petugasTpsService.getAll();
			dispatch(setPetugasTps(data));
		} catch (error) {
			console.error('Error fetching petugas TPS:', error);
			throw error;
		}
	};

	const handleDeleteTps = async (id) => {
		if (!window.confirm('Apakah Anda yakin ingin menghapus TPS ini?')) return;

		try {
			setIsLoading(true);
			await tpsService.remove(id);
			await fetchTPS();
			alert('Data TPS berhasil dihapus');
		} catch (error) {
			alert('Terjadi kesalahan: ' + error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDeleteAdmin = async (id) => {
		if (!window.confirm('Apakah Anda yakin ingin menghapus Petugas TPS ini?')) return;

		try {
			setIsLoading(true);
			await petugasTpsService.remove(id);
			await fetchPetugasTps();
			alert('Data Petugas TPS berhasil dihapus');
		} catch (error) {
			alert('Terjadi kesalahan: ' + error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const acceptHandle = async (id) => {
		if (!window.confirm('Apakah Anda yakin ingin menerima Hasil Suara ini?')) return;

		try {
			setIsLoading(true);
			await hasilSuaraService.accept(id)
			await fetchHasilSuara()
			alert('Hasil suara berhasil diupdate');
		} catch (error) {
			alert('Terjadi kesalahan: ' + error.message);
		} finally {
			setIsLoading(false);
		}

	}

	const rejectHandle = async (id) => {
		if (!window.confirm('Apakah Anda yakin ingin menolak Hasil Suara ini?')) return;

		try {
			setIsLoading(true);
			await hasilSuaraService.reject(id)
			await fetchHasilSuara()
			alert('Hasil suara berhasil diupdate');
		} catch (error) {
			alert('Terjadi kesalahan: ' + error.message);
		} finally {
			setIsLoading(false);
		}
	}

	const handleCreateAdmin = async (formData) => {
		try {
			await petugasTpsService.create(formData);
			alert('Admin berhasil ditambah')
			await fetchPetugasTps();

		} catch (error) {
			alert('Terjadi kesalahan: ' + error.message);
		} finally {
			setIsLoading(false);
		}
	}

	const handleDeleteHasilSuara = async (id) => {
		if (!window.confirm('Apakah Anda yakin ingin menghapus Hasil Suara ini?')) return;

		try {
			setIsLoading(true);
			await hasilSuaraService.remove(id);
			await fetchHasilSuara();
			alert('Hasil suara berhasil dihapus')
		} catch (error) {
			alert('Terjadi kesalahan: ' + error.message);
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-[90vh]">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-[90vh]">
				<div className="text-red-500 text-center">
					<p className="text-xl font-bold">Error</p>
					<p>{error}</p>
				</div>
			</div>
		);
	}

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
								{value: stats.totalSuaraTerverifikasi, label: "Total Suara"},
								{value: stats.totalSuaraBelumTerverifikasi, label: "Butuh Verifikasi"}
							]}
							icon={Vote}
						/>

						<SummaryCard
							title="Perolehan Suara"
							stats={[
								{value: stats.suaraPaslon[0], label: "Paslon 1"},
								{value: stats.suaraPaslon[1], label: "Paslon 2"}
							]}
							icon={AlertCircle}
							bgColor="bg-white"
						/>

						<SummaryCard
							title="Total Admin"
							stats={[
								{value: petugasTps.length, label: "Admin Terdaftar"}
							]}
							icon={UserCheck}
							bgColor="bg-white"
						/>
					</div>
				</div>

				{/*HASILSUARA*/}
				<div id="hasil-suara" className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-main ">Hasil Suara</h2>
					{/*BELUMVALIDASI*/}
					<div className="bg-white rounded-lg shadow p-6 mb-12">
						<h2 className="text-xl font-semibold mb-4">Hasil Suara Belum Tervalidasi</h2>
						<div className="overflow-x-auto">
							<table className="w-full table-auto whitespace-nowrap">
								<thead className="sticky top-0 bg-gray-50">
								<tr>
									<th className="p-4 text-left font-semibold border-b">ID</th>
									<th className="p-4 text-left font-semibold border-b">Nama TPS</th>
									<th className="p-4 text-left font-semibold border-b">Paslon 1</th>
									<th className="p-4 text-left font-semibold border-b">Paslon 2</th>
									<th className="p-4 text-left font-semibold border-b">Tidak Sah</th>
									<th className="p-4 text-left font-semibold border-b">Total</th>
									<th className="p-4 text-left font-semibold border-b">Status</th>
									<th className="p-4 text-left font-semibold border-b">Bukti</th>
									<th className="p-4 text-left font-semibold border-b">Action</th>
								</tr>
								</thead>
								<tbody>
								{hasilSuara.filter(hs => hs.approval === "PENDING").map((hasil) => (
									<tr key={hasil.id} className="hover:bg-main2">
										<td className="p-4 border-b">{hasil.id}</td>
										<td className="p-4 border-b">{hasil.Tps.nomer_tps}</td>
										<td className="p-4 border-b">{hasil.jumlah_suara_paslon1}</td>
										<td className="p-4 border-b">{hasil.jumlah_suara_paslon2}</td>
										<td className="p-4 border-b">{hasil.jumlah_suara_tidak_sah}</td>
										<td className="p-4 border-b">{hasil.total_suara_masuk}</td>
										<td className="p-4 border-b">{hasil.status}</td>
										<td className="p-4 border-b">
											{hasil.bukti_foto && (
												<a
													href={`https://hasilsuarafinal.web.id/bukti/${hasil.bukti_foto}`}
													target="_blank"
													rel="noopener noreferrer"
													className="text-blue-600 hover:underline"
												>
													Lihat Foto
												</a>
											)}
										</td>
										<td className="p-4 border-b">
											<button
												type="button"
												onClick={() => acceptHandle(hasil.id)}
												className="material-icons text-2xl text-red-500 mr-2">
												<CheckCheck className={"text-main"} size={20}/>
											</button>

											<button
												type="button"
												onClick={() => rejectHandle(hasil.id)}
												className="material-icons text-2xl text-custom-black ml-3">
												<X className={"text-red-600"} size={20}/>
											</button>
										</td>
									</tr>
								))}
								</tbody>
							</table>
						</div>
					</div>

					{/*SUDAHVALIDASI*/}
					<div className="bg-white rounded-lg shadow p-6 mb-12">
						<h2 className="text-xl font-semibold mb-4">Hasil Suara Tervalidasi</h2>
						<div className="overflow-x-auto">
							<table className="w-full table-auto whitespace-nowrap">
								<thead className="sticky top-0 bg-gray-50">
								<tr>
									<th className="p-4 text-left font-semibold border-b">ID</th>
									<th className="p-4 text-left font-semibold border-b">Nama TPS</th>
									<th className="p-4 text-left font-semibold border-b">Paslon 1</th>
									<th className="p-4 text-left font-semibold border-b">Paslon 2</th>
									<th className="p-4 text-left font-semibold border-b">Tidak Sah</th>
									<th className="p-4 text-left font-semibold border-b">Total</th>
									<th className="p-4 text-left font-semibold border-b">Status</th>
									<th className="p-4 text-left font-semibold border-b">Bukti</th>
									<th className="p-4 text-left font-semibold border-b">Approval</th>
									<th className="p-4 text-left font-semibold border-b">Action</th>
								</tr>
								</thead>
								<tbody>
								{hasilSuara.filter(hs => hs.approval !== "PENDING").map((hasil) => (
									<tr key={hasil.id} className="hover:bg-main2">
										<td className="p-4 border-b">{hasil.id}</td>
										<td className="p-4 border-b">{hasil.Tps.nomer_tps}</td>
										<td className="p-4 border-b">{hasil.jumlah_suara_paslon1}</td>
										<td className="p-4 border-b">{hasil.jumlah_suara_paslon2}</td>
										<td className="p-4 border-b">{hasil.jumlah_suara_tidak_sah}</td>
										<td className="p-4 border-b">{hasil.total_suara_masuk}</td>
										<td className="p-4 border-b">{hasil.status}</td>
										<td className="p-4 border-b">
											{hasil.bukti_foto && (
												<a
													href={`https://newapiku.hasilsuarafinal.web.id/bukti/${hasil.bukti_foto}`}
													target="_blank"
													rel="noopener noreferrer"
													className="text-blue-600 hover:underline"
												>
													Lihat Foto
												</a>
											)}
										</td>
										<td className={`p-4 border-b ${hasil.approval === 'PENDING' ? 'bg-yellow-200' : hasil.approval === 'ACCEPT' ? 'bg-green-200' : hasil.approval === 'REJECT' ? 'bg-red-200' : ''}`}>
											{hasil.approval}
										</td>
										<td className="p-4 border-b">
											<button
												type="button"
												onClick={() => handleDeleteHasilSuara(hasil.id)}
											>
												<Trash2 className={"text-red-700"} size={20}/>

											</button>
										</td>
									</tr>
								))}
								</tbody>
							</table>
						</div>
					</div>

					{/*<DataTable title="Hasil Suara Belum Tervalidasi" data={unverifiedVotes} showVerify={true}/>*/}
					{/*<DataTable title="Hasil Suara Tervalidasi" data={verifiedVotes} showVerify={false}/>*/}
				</div>

				{/*TPS*/}
				<div id="tps" className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-main ">Data TPS</h2>
					{/*<DataTable title="Data TPS" data={tpsData}/>*/}

					<div className="bg-white rounded-lg shadow p-6 mb-12">
						<h2 className="text-xl font-semibold mb-4">Tps</h2>
						<div className="overflow-x-auto">
							<table className="w-full table-auto whitespace-nowrap">
								<thead className="sticky top-0 bg-gray-50">
								<tr>
									<th className="p-4 text-left font-semibold border-b">Nomer TPS</th>
									<th className="p-4 text-left font-semibold border-b">Jumlah DPT</th>
									<th className="p-4 text-left font-semibold border-b">Kecamatan</th>
									<th className="p-4 text-left font-semibold border-b">Desa</th>
									<th className="p-4 text-left font-semibold border-b">Action</th>
								</tr>
								</thead>
								<tbody>
								{tps.map((tps) => (
									<tr key={tps.id} className="hover:bg-main2">
										<td className="p-4 border-b">{tps.nomer_tps}</td>
										<td className="p-4 border-b">{tps.jumlah_dpt}</td>
										<td className="p-4 border-b">{tps.Kecamatan.nama_kecamatan}</td>
										<td className="p-4 border-b">{tps.Desa.nama_desa}</td>
										<td className="p-4 border-b">
											<button
												type="button"
												onClick={() => handleDeleteTps(tps.id)}
											>
												<Trash2 className={"text-red-700"} size={20}/>

											</button>
										</td>
									</tr>
								))}

								</tbody>
							</table>
						</div>
					</div>

				</div>

				{/*ADMIN*/}
				<div id="admin" className="mb-8">
					<h2 className="text-2xl font-bold mb-6 text-main ">Admin</h2>
					{/*<DataTable title="Data Admin" data={adminData}/>*/}
					<div className="bg-white rounded-lg shadow p-6 mb-12">
						<h2 className="text-xl font-semibold mb-4">Data Petugas Tps / Admin</h2>
						<div className="overflow-x-auto">
							<table className="w-full table-auto whitespace-nowrap">
								<thead className="sticky top-0 bg-gray-50">
								<tr>
									<th className="p-4 text-left font-semibold border-b">ID</th>
									<th className="p-4 text-left font-semibold border-b">Nama</th>
									<th className="p-4 text-left font-semibold border-b">Username</th>
									<th className="p-4 text-left font-semibold border-b">Role</th>
									<th className="p-4 text-left font-semibold border-b">Action</th>
								</tr>
								</thead>
								<tbody>
								{petugasTps.map((tps) => (
									<tr key={tps.id} className="hover:bg-main2">
										<td className="p-4 border-b">{tps.id}</td>
										<td className="p-4 border-b">{tps.nama}</td>
										<td className="p-4 border-b">{tps.username}</td>
										<td className="p-4 border-b">{tps.role}</td>
										<td className="p-4 border-b">
											<button
												type="button"
												onClick={() => handleDeleteAdmin(tps.id)}
											>
												<Trash2 className={"text-red-700"} size={20}/>
											</button>
										</td>
									</tr>
								))}

								</tbody>
							</table>
						</div>
					</div>
					<AdminModal onSubmit={handleCreateAdmin}/>
				</div>
			</main>
		</div>
	);
};

export default HomeSuperAdmin;