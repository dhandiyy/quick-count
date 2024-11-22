import {useNavigate} from "react-router-dom"

const Home = () => {
	const navigate = useNavigate();

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
					<span className="font-bold">Budiman</span>
				</p>
				<p className="text-2xl font-light">Ayo selesaikan tugas kamu!</p>
			</div>

			{/*input data*/}
			<div className="my-12">
				<p className="text-main font-header text-4xl font-bold">Input Data</p>
				<div className="flex my-5 justify-between items-center gap-4">
					<button
						onClick={() => navigate("/tps")}
						className="w-full bg-main h-[60px] rounded-xl text-2xl text-custom-white">TPS</button>
					<button
						onClick={() => navigate("/hasilsuara")}
						className="w-full bg-main h-[60px] rounded-xl text-2xl text-custom-white">Hasil Suara</button>
				</div>
			</div>

			{/*history data*/}
			<div className="my-12">
				<p className="text-main font-header text-4xl font-bold">History Data</p>
				{/*tabel*/}
				<div className="my-5 relative">
					<div className="overflow-x-auto">
						<table className="w-full table-auto whitespace-nowrap">
							<thead className="sticky top-0 bg-outline">
							<tr>
								<th className="p-4 text-left font-semibold border-b">Admin</th>
								<th className="p-4 text-left font-semibold border-b">TPS</th>
								<th className="p-4 text-left font-semibold border-b">Jumlah Suara Paslon 1</th>
								<th className="p-4 text-left font-semibold border-b">Jumlah Suara Paslon 2</th>
								<th className="p-4 text-left font-semibold border-b">Jumlah Suara Tidak Sah</th>
								<th className="p-4 text-left font-semibold border-b">Total Suara Masuk</th>
								<th className="p-4 text-left font-semibold border-b">Status</th>
								<th className="p-4 text-left font-semibold border-b">Approval</th>
							</tr>
							</thead>
							<tbody>
							<tr className="hover:bg-main2">
								<td className="p-4 border-b">Sholeh</td>
								<td className="p-4 border-b">TPS001</td>
								<td className="p-4 border-b">200</td>
								<td className="p-4 border-b">100</td>
								<td className="p-4 border-b">10</td>
								<td className="p-4 border-b">310</td>
								<td className="p-4 border-b">PARTIAL</td>
								<td className="p-4 border-b">Reject</td>
							</tr>
							<tr className="hover:bg-main2">
								<td className="p-4 border-b">Sholeh</td>
								<td className="p-4 border-b">TPS001</td>
								<td className="p-4 border-b">200</td>
								<td className="p-4 border-b">100</td>
								<td className="p-4 border-b">10</td>
								<td className="p-4 border-b">310</td>
								<td className="p-4 border-b">PARTIAL</td>
								<td className="p-4 border-b">Reject</td>
							</tr>

							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home