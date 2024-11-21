import {Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js"
import {Bar} from "react-chartjs-2"
import {chartData, totalData} from "../assets/dummy/DummyData.js"
import ChartDataLabels from "chartjs-plugin-datalabels"


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
    return (<div className={`flex justify-center items-center h-full min-h-screen p-2 md:p-16`}>
        <div className="w-full max-w-[1280px]">
            <h1 className={"font-header text-center font-bold text-4xl my-6 md:my-12"}>Quick Count Pemilihan Bupati
                <br/>Sumenep 2024</h1>

            <div className={"flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-3 gap-4 lg:gap-8 w-full"}>
                {/* PASLON 1 */}
                <div className="bg-custom-white p-4 rounded-2xl flex flex-col row-span-2 order-2 lg:order-1">
                    <div className={"flex flex-col gap-3 bg-white p-4 rounded-t-xl"}>
                        <div>
                            <h3 className={""}>No. 1</h3>
                            <h2 className={"font-header font-bold text-xl"}>Prabowo & Gibran</h2>
                        </div>
                        <div className="flex gap-3">
                            <div className="border border-outline rounded-xl p-3">
                                <img className={"rounded-lg aspect-square object-cover mb-4"}
                                     src="https://img.harianjogja.com/posts/2018/11/21/954082/prabowo-subianto.jpg"
                                     alt="Paslon 1"/>
                                <h4 className={"font-header font-bold text-xl"}>Prabowo Subianto</h4>
                                <p>Calon Bupati</p>
                            </div>
                            <div className="border border-outline rounded-xl p-2">
                                <img className={"rounded-lg aspect-square object-cover mb-4"}
                                     src="https://img.harianjogja.com/posts/2018/11/21/954082/prabowo-subianto.jpg"
                                     alt="Paslon 1"/>
                                <h4 className={"font-header font-bold text-xl"}>Prabowo Subianto</h4>
                                <p>Calon Bupati</p>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-red-500 h-8 rounded-b-xl"}/>
                </div>

                {/* BAR CHART */}
                <div className="p-4 rounded-2xl flex flex-col h-full row-span-2 order-1 lg:order-2 aspect-square lg:aspect-auto">
                    <Bar className={"h-full"} data={chartData} options={{
                        responsive: true, maintainAspectRatio: false, plugins: {
                            title: {
                                display: true, text: 'Hasil Perhitungan Suara (%)',
                            }, tooltip: {
                                enabled: true
                            }, legend: {
                                display: false
                            }, datalabels: {
                                display: true, // Enable data labels
                                color: 'white', // Text color inside the bars
                                align: 'center', // Align labels in the center of the bars
                                anchor: 'center', // Anchor to the center of each bar
                                font: {
                                    weight: 'bold', // Make the label text bold
                                    size: 32, // Font size
                                }, formatter: function (value) {
                                    // Add suffix (e.g., percentage sign or any custom text)
                                    return Math.round((value / totalData.counted) * 100) + '%'; // Add '%' suffix to the value
                                },
                            },
                        },
                    }}/>
                </div>

                {/* PASLON 2 */}
                <div className="bg-custom-white p-4 rounded-2xl flex flex-col row-span-2 order-3">
                    <div className={"flex flex-col gap-3 bg-white p-4 rounded-t-xl"}>
                        <div>
                            <h3 className={""}>No. 1</h3>
                            <h2 className={"font-header font-bold text-xl"}>Prabowo & Gibran</h2>
                        </div>
                        <div className="flex gap-3">
                            <div className="border border-outline rounded-xl p-3">
                                <img className={"rounded-lg aspect-square object-cover mb-4"}
                                     src="https://img.harianjogja.com/posts/2018/11/21/954082/prabowo-subianto.jpg"
                                     alt="Paslon 1"/>
                                <h4 className={"font-header font-bold text-xl"}>Prabowo Subianto</h4>
                                <p>Calon Bupati</p>
                            </div>
                            <div className="border border-outline rounded-xl p-2">
                                <img className={"rounded-lg aspect-square object-cover mb-4"}
                                     src="https://img.harianjogja.com/posts/2018/11/21/954082/prabowo-subianto.jpg"
                                     alt="Paslon 1"/>
                                <h4 className={"font-header font-bold text-xl"}>Prabowo Subianto</h4>
                                <p>Calon Bupati</p>
                            </div>
                        </div>
                    </div>
                    <div className={"bg-blue-500 h-8 rounded-b-xl"}/>
                </div>

                <div className="border border-outline rounded-2xl p-8 flex flex-col justify-between order-3">
                    <p className={"font-light"}>
                        <div className={"inline-block align-top rounded-full m-2 w-[10px] h-[10px] bg-yellow-200"}/>
                        Total Suara Sudah Dihitung
                    </p>
                    <div>
                        <p className={"font-header font-bold text-6xl"}>
                            {Math.round((totalData.counted / (totalData.counted + totalData.uncounted)) * 100)}%
                        </p>
                        <p className={"font-light"}>{totalData.counted} dari {totalData.counted + totalData.uncounted}</p>
                    </div>
                </div>

                <div className="border border-outline rounded-2xl p-8 flex flex-col justify-between col-span-2 order-3">
                    <p className={"font-light"}>
                        <div className={"inline-block align-top rounded-full m-2 w-[10px] h-[10px] bg-yellow-200"}/>
                        Updated At
                    </p>
                    <div>
                        <p className={"font-header font-bold text-2xl md:text-6xl"}>
                            {formatDate(Date.now())}
                        </p>
                        <p className={"font-light italic"}>source: <span className={"font-normal"}>KPU Kabupaten Sumenep</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default VotingResult;