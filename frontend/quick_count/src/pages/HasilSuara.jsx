import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import tpsService from "../services/tps.js";
import hasilSuaraService from "../services/hasilSuara.js"
import {setTps} from "../reducers/tpsReducer.js";
import {setHasilSuara} from "../reducers/hasilSuaraReducer.js";

const HasilSuara = () => {
	const dispatch = useDispatch()
	const hasilSuara = useSelector(state => state.hasilSuara)
	const tps = useSelector(state => state.tps);
	const admin = useSelector(state => state.admin)

	const [formData, setFormData] = useState({
		tps_id: '',
		jumlah_suara_paslon1: '',
		jumlah_suara_paslon2: '',
		jumlah_suara_tidak_sah: '',
		total_suara_masuk: '',
		status: 'PARTIAL'
	});
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		hasilSuaraService.setToken(admin.token)
		tpsService.setToken(admin.token)
		fetchTPS();
		fetchHasilSuara();
	}, []);

	const fetchTPS = async () => {
		try {
			const tpsResponse = await tpsService.getAll();
			dispatch(setTps(tpsResponse.data));
		} catch (error) {
			console.error('Error fetching TPS:', error);
		}
	};

	const fetchHasilSuara = async () => {
		try {
			const hasilSuaraResponse = await hasilSuaraService.getAll()
			dispatch(setHasilSuara(hasilSuaraResponse.data))
		} catch (error) {
			console.error('Error fetching hasil suara:', error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		// Validasi ukuran file (3MB)
		if (file && file.size > 3 * 1024 * 1024) {
			alert('Ukuran file melebihi 3MB');
			e.target.value = '';
			return;
		}
		setSelectedFile(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Submit data hasil suara
			const newHasilSuara = {
				tps_id: parseInt(formData.tps_id),
				jumlah_suara_paslon1: parseInt(formData.jumlah_suara_paslon1),
				jumlah_suara_paslon2: parseInt(formData.jumlah_suara_paslon2),
				jumlah_suara_tidak_sah: parseInt(formData.jumlah_suara_tidak_sah),
				total_suara_masuk: parseInt(formData.total_suara_masuk),
				status: formData.status
			}

			const response = await hasilSuaraService.create(newHasilSuara);

			// Jika ada file yang dipilih, upload file
			if (selectedFile && response.data.id) {
				const formData = new FormData();
				formData.append('bukti_foto', selectedFile);

				await hasilSuaraService.upload(response.data.id, formData)
			}

			// Reset form
			setFormData({
				tps_id: '',
				jumlah_suara_paslon1: '',
				jumlah_suara_paslon2: '',
				jumlah_suara_tidak_sah: '',
				total_suara_masuk: '',
				status: 'PARTIAL'
			});
			setSelectedFile(null);
			if (document.getElementById('file_input')) {
				document.getElementById('file_input').value = '';
			}

			// Refresh data
			fetchHasilSuara();
			alert('Data berhasil disimpan!');

		} catch (error) {
			console.error('Error submitting data:', error);
			alert('Terjadi kesalahan saat menyimpan data');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-background w-[412px] h-[915px] overflow-y-auto relative px-8 py-12">
			<p className="text-main font-header text-2xl font-bold">Input Data - Hasil Suara</p>

			{/*form input*/}
			<form onSubmit={handleSubmit}
			      className="w-full bg-custom-white py-5 px-8 rounded-xl border border-outline my-5">
				<div>
					<p className="text-xl text-custom-black my-2 font-bold">Nama TPS</p>
					<select
						name="tps_id"
						value={formData.tps_id}
						onChange={handleInputChange}
						required
						className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"
					>
						<option value="" disabled>Pilih TPS</option>
						{tps.map(tps => (
							<option key={tps.id} value={tps.id}>{tps.nomer_tps}</option>
						))}
					</select>
				</div>

				<div>
					<p className="text-xl text-custom-black my-2 font-bold">Jumlah Suara Paslon 1</p>
					<input
						type="number"
						name="jumlah_suara_paslon1"
						value={formData.jumlah_suara_paslon1}
						onChange={handleInputChange}
						required
						className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"
					/>
				</div>

				<div>
					<p className="text-xl text-custom-black my-2 font-bold">Jumlah Suara Paslon 2</p>
					<input
						type="number"
						name="jumlah_suara_paslon2"
						value={formData.jumlah_suara_paslon2}
						onChange={handleInputChange}
						required
						className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"
					/>
				</div>

				<div>
					<p className="text-xl text-custom-black my-2 font-bold">Jumlah Suara Tidak Sah</p>
					<input
						type="number"
						name="jumlah_suara_tidak_sah"
						value={formData.jumlah_suara_tidak_sah}
						onChange={handleInputChange}
						required
						className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"
					/>
				</div>

				<div>
					<p className="text-xl text-custom-black my-2 font-bold">Total Suara Masuk</p>
					<input
						type="number"
						name="total_suara_masuk"
						value={formData.total_suara_masuk}
						onChange={handleInputChange}
						required
						className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"
					/>
				</div>

				<div>
					<p className="text-xl text-custom-black my-2 font-bold">Status</p>
					<select
						name="status"
						value={formData.status}
						onChange={handleInputChange}
						className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"
					>
						<option value="PARTIAL">PARTIAL</option>
						<option value="COMPLETE">COMPLETE</option>
					</select>
				</div>

				<div>
					<p className="text-xl text-custom-black my-2 font-bold">
						Bukti Foto
						<span className="text-sm font-light italic">(Ukuran maksimal foto 3 mb)</span>
					</p>
					<input
						id="file_input"
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						required
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="bg-main w-full h-14 rounded-full mt-5 mb-2 text-custom-white text-xl disabled:opacity-50"
				>
					{loading ? 'Menyimpan...' : 'Submit'}
				</button>
			</form>

			{/*history data*/}
			<div className="my-12">
				<p className="text-main font-header text-2xl font-bold">History Data</p>
				<div className="my-5 relative p-2">
					<div className="overflow-x-auto">
						<table className="w-full table-auto whitespace-nowrap">
							<thead className="sticky top-0 bg-outline">
							<tr>
								<th className="p-4 text-left font-semibold border-b">Nama TPS</th>
								<th className="p-4 text-left font-semibold border-b">Paslon 1</th>
								<th className="p-4 text-left font-semibold border-b">Paslon 2</th>
								<th className="p-4 text-left font-semibold border-b">Tidak Sah</th>
								<th className="p-4 text-left font-semibold border-b">Total</th>
								<th className="p-4 text-left font-semibold border-b">Status</th>
								<th className="p-4 text-left font-semibold border-b">Approval</th>
								<th className="p-4 text-left font-semibold border-b">Bukti</th>
								<th className="p-4 text-left font-semibold border-b">Action</th>
							</tr>
							</thead>
							<tbody>
							{hasilSuara.filter(hs => hs.Admin.username === admin.username).map((hasil) => (
								<tr key={hasil.id} className="hover:bg-main2">
									<td className="p-4 border-b">{hasil.Tps.nomer_tps}</td>
									<td className="p-4 border-b">{hasil.jumlah_suara_paslon1}</td>
									<td className="p-4 border-b">{hasil.jumlah_suara_paslon2}</td>
									<td className="p-4 border-b">{hasil.jumlah_suara_tidak_sah}</td>
									<td className="p-4 border-b">{hasil.total_suara_masuk}</td>
									<td className="p-4 border-b">{hasil.status}</td>
									<td className="p-4 border-b">{hasil.approval}</td>
									<td className="p-4 border-b">
										{hasil.bukti_foto && (
											<a
												href={`http://localhost:3001/bukti/${hasil.bukti_foto}`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:underline"
											>
												Lihat Foto
											</a>
										)}
									</td>
									<td className="p-4 border-b">
										<button className="material-icons text-2xl text-red-500 mr-2">delete</button>
										<button className="material-icons text-2xl text-custom-black ml-3">edit</button>
									</td>
								</tr>
							))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
export default HasilSuara