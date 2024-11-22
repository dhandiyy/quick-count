import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import tpsService from "../services/tps.js"
import desaService from "../services/desa.js"
import {setTps} from "../reducers/tpsReducer.js";

const Tps = () => {
	const dispatch = useDispatch();
	const admin = useSelector(state => state.admin)
	const tps = useSelector(state => state.tps)
	console.log("tps", tps)
	useEffect(() => {
		tpsService.setToken(admin.token)
		tpsService.getAll().then(tps => {
			dispatch(setTps(tps.data))

		})
	}, []);


	return (
		<div className="bg-background w-[412px] h-[915px] overflow-y-auto relative px-8 py-12">
			<p className="text-main font-header text-2xl font-bold">Input Data - TPS</p>

			{/*form input*/}
			<div className={" w-full bg-custom-white py-5 px-8 rounded-xl border border-outline my-5"}>
				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Nomer TPS</p>
					<input type="text"
					       className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"/>
				</div>

				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Jumlah DPT</p>
					<input type="number"
					       className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"/>
				</div>

				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Kecamatan</p>
					<select
						className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl">
						<option selected>Pilih kecamatan</option>
						<option value="US">United States</option>
						<option value="CA">Canada</option>
						<option value="FR">France</option>
						<option value="DE">Germany</option>
					</select>

				</div>

				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Desa</p>
					<select
						className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl">
						<option selected>Pilih desa</option>
						<option value="US">United States</option>
						<option value="CA">Canada</option>
						<option value="FR">France</option>
						<option value="DE">Germany</option>
					</select>
				</div>
				<button className={"bg-main w-full h-14 rounded-full mt-7 text-custom-white text-xl"}>Submit</button>
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

export default Tps