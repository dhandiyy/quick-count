import RightArrow from "../components/arrow/RightArrow.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {formatNumber} from "../utils/helper.js";
import {getTotalVotesAndPercentagesByKecamatan, groupByKecamatan} from "../utils/dataManipulation.js";
import {useDispatch, useSelector} from "react-redux";
import hasilSuaraService from "../services/hasilSuara.js";
import {setHasilSuara} from "../reducers/hasilSuaraReducer.js";

const DistrictVotingResult = () => {
	const dispatch = useDispatch();
	const hasilSuara = useSelector(state => state.hasilSuara);
	const navigate = useNavigate();
	const [data, setData] = useState(null);
	const [total, setTotal] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);


	const fetchDataAndCalculate = async () => {
		try {
			setIsLoading(true);
			setError(null);

			// Selalu fetch data baru dari server
			const response = await hasilSuaraService.getAll();
			dispatch(setHasilSuara(response.data));

			// Kalkulasi data dengan hasil suara yang baru
			const hasilSuaraAccepted = response.data.filter(hs => hs.approval === "ACCEPT");
			const groupedData = groupByKecamatan(hasilSuaraAccepted);
			setData(groupedData);
			const votesAndPercentages = getTotalVotesAndPercentagesByKecamatan(groupedData);
			setTotal(votesAndPercentages);

		} catch (err) {
			setError(err.message || 'Terjadi kesalahan saat mengambil data');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchDataAndCalculate();

		// Set up interval untuk fetch data setiap 10 menit = 2*60*1000
		const intervalId = setInterval(fetchDataAndCalculate, 10*60*1000);

		// Cleanup interval saat component unmount
		return () => clearInterval(intervalId);
	}, []);

	const handleOnClick = (data) => {
		navigate(`/detail/${data.kecamatanId}`);
	};

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

	if (!data || !total) {
		return (
			<div className="flex justify-center items-center h-[90vh]">
				<p className="text-gray-500">Data tidak ditemukan</p>
			</div>
		);
	}


	return (
		<div className={`flex justify-center items-start lg:items-center h-full min-h-[90vh] p-4 lg:p-16`}>
			<div className="w-full max-w-[1280px]">
				<div className={"mb-6 md:mb-12"}>
					<h1 className={"font-header text-center font-bold text-2xl md:text-4xl"}>Detail Hasil Suara
						<br/>Pemilihan Bupati Kab. Sumenep 2024</h1>

					<div
						className={"text-xs md:text-lg flex-wrap justify-center mx-auto my-4 flex gap-3 items-center bg-main text-white px-4 py-2 rounded-br-xl rounded-tl-xl w-fit"}>
						<p className={"font-medium"}>Indonesia</p>
						<RightArrow color={"white"}/>
						<p className={"font-medium"}>Jawa Timur</p>
						<RightArrow color={"white"}/>
						<Link to={"/detail"} className={"font-bold hover:underline underline-offset-2"}>Kab.
							Sumenep</Link>
					</div>
				</div>

				<div className={"w-full lg:w-5/6 flex flex-col items-center mx-auto"}>
					{/* HINT */}
					<div className="w-full flex flex-col md:flex-row gap-2 md:gap-8 my-2 italic text-sm text-gray-500">
						<div className={"flex items-center gap-2"}>
							<div className={`w-4 h-4 bg-main inline-block rounded-full`}/>
							<p>Paslon 1: <span className={"font-bold"}>Fikri - Unais</span></p>
						</div>
						<div className={"flex items-center gap-2"}>
							<div className={`w-4 h-4 bg-main3 inline-block rounded-full`}/>
							<p>Paslon 2: <span className={"font-bold"}>Fauzi - Hasyim</span></p>
						</div>
					</div>

					{/* TABLE */}
					<div className="w-full relative overflow-x-auto rounded-xl border-outline border">
						<table className="w-full text-md text-left rtl:text-right text-gray-500">
							{/* HEAD */}
							<thead
								className="text-md text-gray-700 uppercase bg-outline">
							<tr>
								<th scope="col" className="py-2 px-3 md:py-3 md:px-6">
									No.
								</th>
								<th scope="col" className="py-1 ps-3 pe-12 md:py-3 md:ps-6 md:pe-64">
									Kecamatan
								</th>
								<th scope="col" className="py-2 px-3 md:py-3 md:px-6 justify-items-center">
									<div className={"flex items-center gap-2"}>
										<div
											className={`w-2 h-2 bg-main inline-block rounded-full`}/>
										Paslon 1 (FINAL)
									</div>
								</th>
								<th scope="col" className="py-2 px-3 md:py-3 md:px-6 justify-items-center">
									<div className={"flex items-center gap-2"}>
										<div
											className={`w-2 h-2 bg-main3 inline-block rounded-full`}/>
										Paslon 2 (FAHAM)
									</div>
								</th>
							</tr>
							</thead>

							{/* BODY */}
							{data && total && (
								<tbody>
								{data.map((row, idx) => (
									<tr onClick={() => handleOnClick(row)} key={idx}
									    className={`bg-white border-b text-center hover:bg-background cursor-pointer`}>
										<th scope="row"
										    className="text-start py-1 px-3 md:py-3 md:px-6 font-medium text-gray-900 whitespace-nowrap ">
											{idx + 1}
										</th>
										<td scope="row"
										    className="text-start py-1 px-3 md:py-3 md:px-6 font-medium text-gray-900 whitespace-nowrap ">
											{row.kecamatanName}
										</td>
										<td className="py-1 px-3 md:py-3 md:px-6">
											<p className={"font-medium text-black"}>{((row.jumlah_suara_paslon1 / row.total_suara_sah) * 100).toFixed(2)}%</p>
											<p className={"text-xs font-light"}>{formatNumber(row.jumlah_suara_paslon1)}</p>
										</td>
										<td className="py-1 px-3 md:py-3 md:px-6">
											<p className={"font-medium text-black"}>{((row.jumlah_suara_paslon2 / row.total_suara_sah) * 100).toFixed(2)}%</p>
											<p className={"text-xs font-light"}>{formatNumber(row.jumlah_suara_paslon2)}</p>
										</td>
									</tr>
								))}

								{/* TOTAL */}
								<tr className="text-md text-gray-700 uppercase bg-outline font-bold">
									<td scope="col" className="py-1 ps-3 pe-12 md:py-3 md:ps-6 md:pe-64" colSpan={2}>
										Total
									</td>

									<td className="py-1 px-3 md:py-3 md:px-6 justify-items-center">
										<p className={"text-lg font-medium text-black"}>{((total.jumlah_suara_paslon1 / total.total_suara_sah) * 100).toFixed(2)}%</p>
										<p className={"text-sm font-light"}>{formatNumber(total.jumlah_suara_paslon1)}</p>
									</td>
									<td className="py-1 px-3 md:py-3 md:px-6 justify-items-center">
										<p className={"text-lg font-medium text-black"}>{((total.jumlah_suara_paslon2 / total.total_suara_sah) * 100).toFixed(2)}%</p>
										<p className={"text-sm font-light"}>{formatNumber(total.jumlah_suara_paslon2)}</p>
									</td>
								</tr>
								</tbody>
							)}
						</table>
					</div>
				</div>
			</div>
		</div>);
};

export default DistrictVotingResult;

