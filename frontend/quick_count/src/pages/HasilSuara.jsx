const HasilSuara = () => {
	return (
		<div className="bg-background w-[412px] h-[915px] overflow-y-auto relative px-8 py-12">
			<p className="text-main font-header text-2xl font-bold">Input Data - Hasil Suara</p>

			{/*form input*/}
			<div className={" w-full bg-custom-white py-5 px-8 rounded-xl border border-outline my-5"}>
				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Nama TPS</p>
					<select
						className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl">
						<option selected>Pilih TPS</option>
						<option value="CA">TPS001</option>
						<option value="CB">TPS002</option>
					</select>
				</div>

				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Jumlah Suara Paslon 1</p>
					<input type="text"
					       className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"/>
				</div>

				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Jumlah Suara Paslon 2</p>
					<input type="number"
					       className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"/>
				</div>

				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Jumlah Suara Tidak Sah</p>
					<input type="number"
					       className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"/>
				</div>

				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Total Suara Masuk</p>
					<input type="number"
					       className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl"/>
				</div>

				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Status</p>
					<select
						className="w-full outline mb-2 outline-[0.1rem] h-12 outline-outline rounded-md px-4 text-xl">
						<option value="CA">PARTIAL</option>
						<option value="CB">COMPLETE</option>
					</select>
				</div>

				<div>
					<p className={"text-xl text-custom-black my-2 font-bold"}>Bukti Foto<span
						className={"text-sm font-light italic"}>(Ukuran maksimal foto 3 mb)</span></p>
					{/*<label htmlFor="file_input">Upload</label>*/}
					<input
						id="file_input"
						type="file"
						required={true}
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
					/>
				</div>
				<button className={"bg-main w-full h-14 rounded-full mt-5 mb-2 text-custom-white text-xl"}>Submit
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
								<th className="p-4 text-left font-semibold border-b">Nama TPS</th>
								<th className="p-4 text-left font-semibold border-b">TPS</th>
								<th className="p-4 text-left font-semibold border-b">Jumlah Suara Paslon 1</th>
								<th className="p-4 text-left font-semibold border-b">Jumlah Suara Paslon 2</th>
								<th className="p-4 text-left font-semibold border-b">Jumlah Suara Tidak Sah</th>
								<th className="p-4 text-left font-semibold border-b">Total Suara Masuk</th>
								<th className="p-4 text-left font-semibold border-b">Status</th>
								<th className="p-4 text-left font-semibold border-b">Approval</th>
								<th className="p-4 text-left font-semibold border-b">Action</th>
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
								<td className="p-4 border-b">
									<button className="material-icons text-2xl text-red-500 mr-2">delete</button>
									<button className="material-icons text-2xl text-custom-black ml-3">edit</button>
								</td>
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
								<td className="p-4 border-b">
									<button className="material-icons text-2xl text-red-500 mr-2">delete</button>
									<button className="material-icons text-2xl text-custom-black ml-3">edit</button>
								</td>
							</tr>

							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
export default HasilSuara