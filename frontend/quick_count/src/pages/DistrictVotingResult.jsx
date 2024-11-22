import RightArrow from "../components/arrow/RightArrow.jsx";
import {fixedData} from "../assets/dummy/DummyData.js";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {formatNumber} from "../utils/helper.js";
import {getTotalVotesAndPercentagesByKecamatan, groupByKecamatan} from "../utils/dataManipulation.js";

const DistrictVotingResult = () => {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [total, setTotal] = useState(null)

    useEffect(() => {
        const groupedData = groupByKecamatan(fixedData)
        const votesAndPercentages = getTotalVotesAndPercentagesByKecamatan(groupedData)
        setData(groupedData)
        setTotal(votesAndPercentages)
    }, []);

    const handleOnCLick = (data) => {
        navigate(`/detail/${data.kecamatanId}`)
    }

    return (<div className={`flex justify-center items-start lg:items-center h-full min-h-[90vh] p-4 lg:p-16`}>
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
                    <Link to={"/detail"} className={"font-bold hover:underline underline-offset-2"}>Kab. Sumenep</Link>
                </div>
            </div>

            <div className={"w-full lg:w-3/4 flex flex-col items-center mx-auto"}>
                {/* HINT */}
                <div className="w-full flex flex-col md:flex-row gap-2 md:gap-8 my-2 italic text-sm text-gray-500">
                    <div className={"flex items-center gap-2"}>
                        <div className={`w-4 h-4 bg-main inline-block rounded-full`}/>
                        <p>Paslon 1: <span className={"font-bold"}>Prabowo - Gibran</span></p>
                    </div>
                    <div className={"flex items-center gap-2"}>
                        <div className={`w-4 h-4 bg-blue-400 inline-block rounded-full`}/>
                        <p>Paslon 2: <span className={"font-bold"}>Anies - Amin</span></p>
                    </div>
                </div>

                {/* TABLE */}
                <div className="w-full relative overflow-x-auto rounded-xl border-outline border">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        {/* HEAD */}
                        <thead
                            className="text-xs text-gray-700 uppercase bg-outline">
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
                                    Paslon 1
                                </div>
                            </th>
                            <th scope="col" className="py-2 px-3 md:py-3 md:px-6 justify-items-center">
                                <div className={"flex items-center gap-2"}>
                                    <div
                                        className={`w-2 h-2 bg-blue-400 inline-block rounded-full`}/>
                                    Paslon 2
                                </div>
                            </th>
                        </tr>
                        </thead>

                        {/* BODY */}
                        {data && total && (
                            <tbody>
                            {data.map((row, idx) => (
                                <tr onClick={() => handleOnCLick(row)} key={idx}
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
                            <tr className="text-xs text-gray-700 uppercase bg-outline font-bold">
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

