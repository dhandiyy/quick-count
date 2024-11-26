import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js"
import {Bar} from "react-chartjs-2"
import ChartDataLabels from "chartjs-plugin-datalabels"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import hasilSuaraService from "../services/hasilSuara.js";
import {setHasilSuara} from "../reducers/hasilSuaraReducer.js";
import Header from "../components/header/Header.jsx";
import aliPhoto from '../assets/M Ali Fikri.jpg';
import unaisPhoto from '../assets/Unais Ali Hisyam.jpg';
import Fauzi from '../assets/Fauzi.jpg';
import Kyai from '../assets/kyai.jpg';
import BarChartWithLinks from "../components/barChart/BarChartWithLinks.jsx";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels)

function formatDate(timestamp) {
	const date = new Date(timestamp);

	// Format the date to match "12 Nov 2024 - 15:00"
	const options = {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,  // Use 24-hour format
	};

	// Format the date and time using Intl.DateTimeFormat
	const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

	// Combine date and time with a " - " separator
	return formattedDate.replace(',', ' -');
}

const VotingResult = () => {
	const [updateData, setUpdateData] = useState([0, 0])
	const [suaraSah, setSuaraSah] = useState(0)
	const [totalSuara, setTotalSuara] = useState(0)

	const dispatch = useDispatch()
	const hasilSuara = useSelector(state => state.hasilSuara)

	const fetchData = async () => {
		const hasilSuaraResponse = await hasilSuaraService.getAll()
		dispatch(setHasilSuara(hasilSuaraResponse.data))
	}

	useEffect(() => {
		fetchData();

		const interval = setInterval(() => {
			fetchData();
		}, 10 * 60 * 1000); // Refresh data every 10 minutes

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		calculationData();
	}, [hasilSuara]);

	const calculationData = async () => {
		const hasilSuaraAccepted = hasilSuara.filter(hs => hs.approval === "ACCEPT");
		const totalSuaraPaslon1 = hasilSuaraAccepted.reduce((sum, hs) => sum + hs.jumlah_suara_paslon1, 0);
		const totalSuaraPaslon2 = hasilSuaraAccepted.reduce((sum, hs) => sum + hs.jumlah_suara_paslon2, 0);
		const totalSuaraSah = hasilSuaraAccepted.reduce((sum, hs) => sum + hs.jumlah_suara_paslon1 + hs.jumlah_suara_paslon2, 0);
		const totalSemuaSuara = hasilSuaraAccepted.reduce((sum, hs) => sum + hs.jumlah_suara_paslon1 + hs.jumlah_suara_paslon2 + hs.jumlah_suara_tidak_sah, 0);
		setSuaraSah(totalSuaraSah);
		setTotalSuara(totalSemuaSuara);
		setUpdateData([totalSuaraPaslon1, totalSuaraPaslon2]);
	}


	const chartData = {
		labels: ["Paslon 1", "Paslon 2"],
		datasets: [
			{
				data: updateData,
				label: "Total Suara",
				backgroundColor: ["#14822B", "#FF4545"],
			},
		]
	}

	const totalData = {
		counted: suaraSah,
		DPT: 859185
	}

	const links = [
		'/detail',
		'/detail',
		'/detail',
	];

	return (
		<div className={`flex justify-center items-center h-full min-h-[90vh] p-2`}>
			<div className="w-full max-w-[1280px]">
				<h1 className={"font-header text-center font-bold text-4xl mb-6 md:mb-12"}>Quick Count Pemilihan Bupati
					<br/>Kab. Sumenep 2024</h1>

				<div className={"flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-3 gap-4 lg:gap-8 w-full"}>
					{/* PASLON 1 */}
					<div className="bg-custom-white p-4 rounded-2xl flex flex-col row-span-2 order-2 lg:order-1">
						<div className={"flex flex-col gap-3 bg-white p-4 rounded-t-xl"}>
							<div>
								<h3 className={""}>Pasangan Calon Nomer 1</h3>
								<h2 className={"font-header font-bold text-2xl"}>FINAL</h2>
							</div>
							<div className="flex gap-3">
								<div className="border border-outline rounded-xl p-3">
									<img className={"rounded-lg aspect-square object-cover mb-4"}
									     src={aliPhoto}
									     alt="Paslon 1"/>
									<h4 className={"font-header font-bold text-xl"}>KH. Muhammad Ali Fikri</h4>
									<p>Calon Bupati</p>
								</div>
								<div className="border border-outline rounded-xl p-2">
									<img className={"rounded-lg aspect-square object-cover mb-4"}
									     src={unaisPhoto}
									     alt="Paslon 1"/>
									<h4 className={"font-header font-bold text-xl"}>KH. Unais Ali Hisyam</h4>
									<p>Calon Wakil Bupati</p>
								</div>
							</div>
						</div>
						<div className={"bg-main h-8 rounded-b-xl"}/>
					</div>

					{/* BAR CHART */}
					{/*<div*/}
					{/*	className="p-4 rounded-2xl flex flex-col h-full row-span-2 order-1 lg:order-2 aspect-square lg:aspect-auto">*/}
					{/*	<Bar className={"h-full"} data={chartData} options={{*/}
					{/*		responsive: true, maintainAspectRatio: false, plugins: {*/}
					{/*			title: {*/}
					{/*				display: true, text: 'Hasil Perhitungan Suara (%)',*/}
					{/*			}, tooltip: {*/}
					{/*				enabled: true*/}
					{/*			}, legend: {*/}
					{/*				display: false*/}
					{/*			}, datalabels: {*/}
					{/*				display: true, // Enable data labels*/}
					{/*				color: 'white', // Text color inside the bars*/}
					{/*				align: 'center', // Align labels in the center of the bars*/}
					{/*				anchor: 'center', // Anchor to the center of each bar*/}
					{/*				font: {*/}
					{/*					weight: 'bold', // Make the label text bold*/}
					{/*					size: 32, // Font size*/}
					{/*				}, formatter: function (value) {*/}
					{/*					// Add suffix (e.g., percentage sign or any custom text)*/}
					{/*					return Math.round((value / totalData.counted) * 100) + '%'; // Add '%' suffix to the value*/}
					{/*				},*/}
					{/*			},*/}
					{/*		},*/}
					{/*	}}/>*/}
					{/*</div>*/}

					<div className={"max-w-screen"}>
						<BarChartWithLinks
							chartData={chartData}
							totalData={totalData}
							links={links}
						/>
					</div>

					{/* PASLON 2 */}
					<div className="bg-custom-white p-4 rounded-2xl flex flex-col row-span-2 order-3">
						<div className={"flex flex-col gap-3 bg-white p-4 rounded-t-xl"}>
							<div>
								<h3 className={""}>Pasangan Calon Nomer 2</h3>
								<h2 className={"font-header font-bold text-xl"}>FAHAM</h2>
							</div>
							<div className="flex gap-3">
								<div className="border border-outline rounded-xl p-3">
									<img className={"rounded-lg aspect-square object-cover mb-4"}
									     src={Fauzi}
									     alt="Paslon 1"/>
									<h4 className={"font-header font-bold text-xl"}>Achmad Fauzi</h4>
									<p>Calon Bupati</p>
								</div>
								<div className="border border-outline rounded-xl p-2">
									<img className={"rounded-lg aspect-square object-cover mb-4"}
									     src={Kyai}
									     alt="Paslon 1"/>
									<h4 className={"font-header font-bold text-xl"}>Imam Hasyim</h4>
									<p>Calon Wkil Bupati</p>
								</div>
							</div>
						</div>
						<div className={"bg-main3 h-8 rounded-b-xl"}/>
					</div>

					<div className="border border-outline rounded-2xl p-8 flex flex-col justify-between order-3">
						<div className="flex items-center">
							<div className={"inline-block align-top rounded-full m-2 w-[10px] h-[10px] bg-main"}/>
							<p className={"font-light"}>Total Suara Sudah Dihitung</p>
						</div>
						<div>
							<p className={"font-header font-bold text-6xl"}>
								{Math.round((totalData.counted / totalData.DPT) * 100)}%
							</p>
							<p className={"font-light"}>{totalSuara} dari {totalData.DPT}</p>
						</div>
					</div>

					<div
						className="border border-outline rounded-2xl p-8 flex flex-col justify-between col-span-2 order-3">
						<div className="flex items-center">
							<div className={"inline-block align-top rounded-full m-2 w-[10px] h-[10px] bg-main"}/>
							<p className={"font-light"}>Updated At</p>
						</div>
						<div>
							<p className={"font-header font-bold text-2xl md:text-6xl"}>
								{formatDate(Date.now())}
							</p>
							<p className={"font-light italic"}>source: <span
								className={"font-normal"}>Relawan Pasangan Ali Fikri dan Unais Ali <span className={"font-extrabold"}>(FINAL)</span></span></p>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default VotingResult;