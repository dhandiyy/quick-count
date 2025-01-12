import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import hasilSuaraService from "../services/hasilSuara.js";
import {setHasilSuara} from "../reducers/hasilSuaraReducer.js";
import aliPhoto from '../assets/M Ali Fikri.jpg';
import unaisPhoto from '../assets/Unais Ali Hisyam.jpg';
import Fauzi from '../assets/Fauzi.jpg';
import Kyai from '../assets/kyai.jpg';
import BarChartWithLinks from "../components/barChart/BarChartWithLinks.jsx";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels)

function formatDate(dateString) {
	const date = new Date(dateString);

	// Array nama bulan dalam format 3 huruf
	const months = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	];

	// Mengambil komponen tanggal
	const day = date.getDate().toString().padStart(2, '0');
	const month = months[date.getMonth()];
	const year = date.getFullYear();

	// Mengambil komponen waktu
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');

	// Menggabungkan semua komponen
	return `${day} ${month} ${year} - ${hours}:${minutes}`;
}

const VotingResult = () => {
	const [updateData, setUpdateData] = useState([0, 0])
	const [suaraSah, setSuaraSah] = useState(0)
	const [totalSuara, setTotalSuara] = useState(0)
	const [hasilSuaraTerakhir, setHasilSuaraTerakhir] = useState({})

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

	const getHasilSuaraTerakhir = async (hasilSuara) => {
		return hasilSuara.reduce((latest, current) => {
			return new Date(current.updated_at) > new Date(latest.updated_at) ? current : latest;
		});
	};

	const calculationData = async () => {
		const hasilSuaraAccepted = hasilSuara.filter(hs => hs.approval === "ACCEPT");
		const totalSuaraPaslon1 = hasilSuaraAccepted.reduce((sum, hs) => sum + hs.jumlah_suara_paslon1, 0);
		const totalSuaraPaslon2 = hasilSuaraAccepted.reduce((sum, hs) => sum + hs.jumlah_suara_paslon2, 0);
		const totalSuaraSah = hasilSuaraAccepted.reduce((sum, hs) => sum + hs.jumlah_suara_paslon1 + hs.jumlah_suara_paslon2, 0);
		const totalSemuaSuara = hasilSuaraAccepted.reduce((sum, hs) => sum + hs.jumlah_suara_paslon1 + hs.jumlah_suara_paslon2 + hs.jumlah_suara_tidak_sah, 0);

		const waktuHasilSuaraTerakhir = hasilSuaraAccepted.reduce((latest, current) => {
			return new Date(current.updated_at) > new Date(latest.updated_at) ? current : latest;
		}, hasilSuaraAccepted[0]);

		setHasilSuaraTerakhir(waktuHasilSuaraTerakhir?.updated_at || null)
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
			{/*<UnderMaintenance />*/}

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

					<div className={"max-w-screen-sm row-span-2 order-1 lg:order-2"}>
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
								{formatDate(hasilSuaraTerakhir)}
							</p>
							<p className={"font-light italic"}>Source: <span
								className={"font-normal"}>Relawan Pasangan Ali Fikri dan Unais Ali <span
								className={"font-extrabold"}>(FINAL) </span></span></p>

							<p className={"font-light italic"}>Kontak kami: <span
								className={"font-normal"}>+601123756635</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VotingResult;