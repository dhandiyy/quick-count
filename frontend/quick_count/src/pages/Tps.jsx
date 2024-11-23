import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import tpsService from "../services/tps.js"
import desaService from "../services/desa.js"
import kecamatanService from "../services/kecamatan.js"
import {createTps, deleteTps, setTps, updateTps} from "../reducers/tpsReducer.js";
import {setDesa} from "../reducers/desaReducer.js";
import {setKecamatan} from "../reducers/kecamatanReducer.js";

const Tps = () => {
	const dispatch = useDispatch();
	const admin = useSelector(state => state.admin);
	const tps = useSelector(state => state.tps);
	const desa = useSelector(state => state.desa);
	const kecamatan = useSelector(state => state.kecamatan);

	const [formData, setFormData] = useState({
		nomerTps: '',
		jumlahDpt: '',
		kecamatanId: '',
		desaId: ''
	})
	const [filteredDesa, setFilteredDesa] = useState([]);
	const [editingId, setEditingId] = useState(null);
	const [loading, setLoading] = useState(true);

	const formRef = useRef(null)


	useEffect(() => {
		tpsService.setToken(admin.token);
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const tpsResponse = await tpsService.getAll();
			dispatch(setTps(tpsResponse.data));
			const desaResponse = await desaService.getAll();
			dispatch(setDesa(desaResponse.data));
			const kecamatanResponse = await kecamatanService.getAll();
			dispatch(setKecamatan(kecamatanResponse.data));
			setLoading(false);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		if (formData.kecamatanId) {
			const filteredDesaList = desa.filter(
				d => d.kecamatan_id.toString() === formData.kecamatanId
			);
			setFilteredDesa(filteredDesaList);
		}
	}, [formData.kecamatanId, desa]);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.nomerTps || !formData.jumlahDpt || !formData.kecamatanId || !formData.desaId) {
			alert('Semua field harus diisi');
			return;
		}

		try {
			const newTps = {
				nomer_tps: formData.nomerTps,
				jumlah_dpt: parseInt(formData.jumlahDpt),
				kecamatan_id: parseInt(formData.kecamatanId),
				desa_id: parseInt(formData.desaId)
			};

			if (editingId) {
				await tpsService.update(editingId, newTps);
				// Fetch fresh data after update
				await fetchData();
				setEditingId(null);
				alert('Data TPS berhasil diupdate');

			} else {
				// Create new TPS
				const response = await tpsService.create(newTps);
				dispatch(createTps(response.data));
				alert('Data TPS berhasil ditambahkan');
			}

			setFormData({
				nomerTps: '',
				jumlahDpt: '',
				kecamatanId: '',
				desaId: ''
			});
		} catch (error) {
			alert('Terjadi kesalahan: ' + error.message);
		}
	};

	const handleEdit = (tpsItem) => {
		formRef.current?.scrollIntoView({ behavior: 'smooth' });

		setEditingId(tpsItem.id);
		setFormData({
			nomerTps: tpsItem.nomer_tps.toString(),
			jumlahDpt: tpsItem.jumlah_dpt,
		});
	};

	const handleDelete = async (id) => {
		if (window.confirm('Apakah Anda yakin ingin menghapus TPS ini?')) {
			try {
				await tpsService.remove(id);
				await fetchData();
				alert('Data TPS berhasil dihapus');
			} catch (error) {
				alert('Terjadi kesalahan: ' + error.message);
			}
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}


	return (
		<div className="bg-background w-[412px] h-[915px] overflow-y-auto relative px-8 py-12">
			<p className="text-main font-header text-2xl font-bold">Input Data - TPS</p>

			{/*form input*/}
			<div ref={formRef} className={" w-full bg-custom-white py-5 px-8 rounded-xl border border-outline my-5"}>
				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Nomer TPS</p>
					<input type="text"
					       name="nomerTps"
					       value={formData.nomerTps}
					       onChange={handleChange}
					       className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"/>
				</div>

				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Jumlah DPT</p>
					<input type="number"
					       name="jumlahDpt"
					       value={formData.jumlahDpt}
					       onChange={handleChange}
					       className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"/>
				</div>

				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Kecamatan</p>
					<select
						name="kecamatanId"
						value={formData.kecamatanId}
						onChange={handleChange}
						className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl">

						<option value="" disabled>Pilih kecamatan</option>
						{kecamatan.map((kecamatan) => (
							<option key={kecamatan.id} value={kecamatan.id}>
								{kecamatan.nama_kecamatan}
							</option>
						))}
					</select>

				</div>

				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Desa</p>
					<select
						name="desaId"
						value={formData.desaId}
						onChange={handleChange}
						className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"
						disabled={!formData.kecamatanId}
					>
						<option value="" disabled>Pilih desa</option>
						{filteredDesa.map((desa) => (
							<option key={desa.id} value={desa.id}>
								{desa.nama_desa}
							</option>
						))}
					</select>
				</div>
				<button
					type="submit"
					className="bg-main w-full h-14 rounded-full mt-7 text-custom-white text-xl"
					onClick={handleSubmit}
				>
					{editingId ? 'Update' : 'Submit'}
				</button>
			</div>

			{/*history data*/}
			<div className="my-12">
				<p className="text-main font-header text-2xl font-bold">History Data</p>
				{/*tabel*/}
				<div className="my-5 relative p-2">
					<div className="overflow-x-auto">
						<table className="w-full table-auto whitespace-nowrap">
							<thead className="sticky top-0 bg-outline">
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
											onClick={() => handleDelete(tps.id)}
											className="material-icons text-2xl text-red-500 mr-2"
										>
											delete
										</button>
										<button
											type="button"
											onClick={() => handleEdit(tps)}
											className="material-icons text-2xl text-custom-black ml-3"
										>
											edit
										</button>
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

export default Tps