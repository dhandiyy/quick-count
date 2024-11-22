import {formatNumber} from "../../utils/formatter.js";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useReducer} from "react";

const VotingResultTable = ({
                               labels, hintDesc, labelColors, sumData, isNav
                           }) => {
    // const navigate = useNavigate()
    //
    // const handleOnCLick = (data) => {
    //     if (isNav) {
    //         console.log(isNav)
    //         console.log(data.slug)
    //         navigate(data.slug)
    //     }
    // }

    return (
        <>
            {/*/!* HINT *!/*/}
            {/*<div className="w-full flex gap-8 my-2 italic text-sm text-gray-500">*/}
            {/*    {labels && labels.map((word, i) => (*/}
            {/*        <div key={i} className={"flex items-center gap-2"}>*/}
            {/*            <div className={`w-4 h-4 bg-${labelColors[i]} inline-block rounded-full`}/>*/}
            {/*            <p>{labels[i]}: <span className={"font-bold"}>{hintDesc[i]}</span></p>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {/*/!* TABLE *!/*/}
            {/*<div className="w-full relative overflow-x-auto rounded-xl border-outline border">*/}
            {/*    <table className="w-full text-sm text-left rtl:text-right text-gray-500">*/}
            {/*        /!* HEAD *!/*/}
            {/*        <thead*/}
            {/*            className="text-xs text-gray-700 uppercase bg-outline">*/}
            {/*        <tr>*/}
            {/*            <th scope="col" className="py-3 px-6">*/}
            {/*                No.*/}
            {/*            </th>*/}
            {/*            <th scope="col" className="py-3 ps-6 pe-64">*/}
            {/*                Kecamatan*/}
            {/*            </th>*/}
            {/*            {labels && labels.map((label, idx) => (*/}
            {/*                <th key={idx} scope="col" className="px-6 py-3 justify-items-center">*/}
            {/*                    <div className={"flex items-center gap-2"}>*/}
            {/*                        <div className={`w-2 h-2 bg-${labelColors[idx]} inline-block rounded-full`}/>*/}
            {/*                        {labels[idx]}*/}
            {/*                    </div>*/}
            {/*                </th>*/}
            {/*            ))}*/}
            {/*        </tr>*/}
            {/*        </thead>*/}

            {/*        /!* BODY *!/*/}
            {/*        <tbody>*/}
            {/*        {sumData.data && sumData.data.map((row, idx) => (*/}
            {/*            <tr onClick={() => handleOnCLick(row)} key={idx} className={`bg-white border-b text-center hover:bg-background ${isNav && "cursor-pointer"}`}>*/}
            {/*                <th scope="row"*/}
            {/*                    className="text-start px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">*/}
            {/*                    {idx + 1}*/}
            {/*                </th>*/}
            {/*                <th scope="row"*/}
            {/*                    className="text-start px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">*/}
            {/*                    {row.name}*/}
            {/*                </th>*/}
            {/*                {row.comparisons && row.comparisons.map((col, colIdx) => (*/}
            {/*                    <td key={colIdx} className="px-6 py-4">*/}
            {/*                        <p className={"font-medium text-black"}>{col.percentage.toFixed(2)}%</p>*/}
            {/*                        <p className={"text-xs font-light"}>{formatNumber(col.total)}</p>*/}
            {/*                    </td>*/}
            {/*                ))}*/}
            {/*            </tr>*/}
            {/*        ))}*/}

            {/*        /!* TOTAL *!/*/}
            {/*        <tr className="text-xs text-gray-700 uppercase bg-outline font-bold">*/}
            {/*            <td scope="col" className="py-3 ps-6 pe-64" colSpan={2}>*/}
            {/*                Total*/}
            {/*            </td>*/}
            {/*            {sumData?.percentages?.map((col, idx) => (*/}
            {/*                <td key={idx} className="py-3 px-6 justify-items-center">*/}
            {/*                    <p className={"text-lg font-medium text-black"}>{col.toFixed(2)}%</p>*/}
            {/*                    <p className={"text-sm font-light"}>{formatNumber(sumData.totalVotesDetail[idx])}</p>*/}
            {/*                </td>*/}
            {/*            ))}*/}
            {/*        </tr>*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</div>*/}
        </>
    );
};

export default VotingResultTable;