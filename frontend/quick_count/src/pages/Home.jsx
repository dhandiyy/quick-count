import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import tpsService from "../services/tps.js";
import {setTps} from "../reducers/tpsReducer.js";
import hasilSuaraService from "../services/hasilSuara.js";
import {setHasilSuara} from "../reducers/hasilSuaraReducer.js";
import {useEffect} from "react";

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch()
	const admin = useSelector(state => state.admin);
	const hasilSuara = useSelector(state => state.hasilSuara)
	const tps = useSelector(state => state.tps);


	const fetchData = async () => {
		const tpsResponse = await tpsService.getAll();
		dispatch(setTps(tpsResponse.data));
		const hasilSuaraResponse = await hasilSuaraService.getAll()
		dispatch(setHasilSuara(hasilSuaraResponse.data))
	}

	useEffect(() => {
		tpsService.setToken(admin.token);
		fetchData();
	}, []);

	return(
		<div className="bg-background w-[412px] h-[915px] overflow-y-auto relative px-8 py-12">

			{/*header*/}
			<div className="flex justify-between items-end">
				<p className="font-header text-main text-4xl font-bold">Home</p>
				<p className="font-header font-light text-2xl">Quick Count</p>
			</div>

			{/*profile*/}
			<div className="bg-custom-white border w-full py-10 px-5 my-5 rounded-xl">
				<p className="text-4xl mb-3">Hallo,
					<span className="font-bold"> {admin.name}</span>
				</p>
				<p className="text-2xl font-light">Ayo selesaikan tugas kamu!</p>
			</div>

			{/*input data*/}
			<div className="my-12">
				<p className="text-main font-header text-4xl font-bold">Input Data</p>
				<div className="flex my-5 justify-between items-center gap-4">
					<button
						onClick={() => navigate("/tps")}
						className="w-full bg-main h-[60px] rounded-xl text-2xl text-custom-white">TPS
					</button>
					<button
						onClick={() => navigate("/hasilsuara")}
						className="w-full bg-main h-[60px] rounded-xl text-2xl text-custom-white">Hasil Suara
					</button>
				</div>
			</div>

			{/*history data*/}
			<div className="my-12">
				<p className="text-main font-header text-4xl font-bold">History Data</p>
				<p className={"font-bold mt-5"}>Hasil Suara</p>
				<div className="my-5 relative">
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
							</tr>
							</thead>
							<tbody>
							{hasilSuara.map((hasil) => (
								<tr key={hasil.id} className="hover:bg-main2">
									<td className="p-4 border-b">{hasil.Tps.nomer_tps}</td>
									<td className="p-4 border-b">{hasil.jumlah_suara_paslon1}</td>
									<td className="p-4 border-b">{hasil.jumlah_suara_paslon2}</td>
									<td className="p-4 border-b">{hasil.jumlah_suara_tidak_sah}</td>
									<td className="p-4 border-b">{hasil.total_suara_masuk}</td>
									<td className="p-4 border-b">{hasil.status}</td>
									<td className={`p-4 border-b ${hasil.approval === 'PENDING' ? 'bg-yellow-200' : hasil.approval === 'ACCEPT' ? 'bg-green-200' : hasil.approval === 'REJECT' ? 'bg-red-200' : ''}`}>
										{hasil.approval}
									</td>
								</tr>
							))}
							</tbody>
						</table>
					</div>
				</div>

				<p className={"font-bold mt-5"}>TPS</p>
				<div className="my-5 relative">
					<div className="overflow-x-auto">
						<table className="w-full table-auto whitespace-nowrap">
							<thead className="sticky top-0 bg-outline">
							<tr>
								<th className="p-4 text-left font-semibold border-b">Nomer TPS</th>
								<th className="p-4 text-left font-semibold border-b">Jumlah DPT</th>
								<th className="p-4 text-left font-semibold border-b">Kecamatan</th>
								<th className="p-4 text-left font-semibold border-b">Desa</th>
							</tr>
							</thead>
							<tbody>
							{tps.map((tps) => (
								<tr key={tps.id} className="hover:bg-main2">
									<td className="p-4 border-b">{tps.nomer_tps}</td>
									<td className="p-4 border-b">{tps.jumlah_dpt}</td>
									<td className="p-4 border-b">{tps.Kecamatan.nama_kecamatan}</td>
									<td className="p-4 border-b">{tps.Desa.nama_desa}</td>
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

export default Home