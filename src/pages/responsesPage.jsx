import IconHover from "@/constants/iconHover";
import {BsThreeDotsVertical} from "react-icons/bs";
import Header from "@/constants/header";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "@/constants/constants";
import {useParams} from "react-router-dom";
import Papa from "papaparse";

const ResponsesPage = () => {
    const {formId} = useParams();
    const noResponses = "No responses. Publish your form to start accepting responses."
    const [responseCount, setResponseCount] = useState(0);
    const [formData, setFormData] = useState(null);
    const [csvData, setCsvData] = useState(null);
    const [showPreview, setShowPreview] = useState(false);


    useEffect(() => {
        const getResponseCount = async () => {
            try {
                const resp = await fetch(`${API_BASE_URL}/response/${formId}/count/`);
                const data = await resp.json();
                setResponseCount(data.count);
            } catch (error) {
                console.error("Error fetching response count:", error);
            }
        };
        getResponseCount();
    }, [formId])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(`${API_BASE_URL}/form/${formId}/complete/`);
                const data = await resp.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching form data:", error);
            }
        }
        fetchData();
    }, [formId]);

    const getResponseData = async () => {
        try {
            const resp = await fetch(`${API_BASE_URL}/response/${formId}/csv`);
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            const csvString = await resp.text();
            Papa.parse(csvString, {
                header: true,
                complete: (results) => {
                    setCsvData(results.data);
                    setShowPreview(true);
                }
            });
        } catch (error) {
            console.error("Error fetching response data:", error);
        }
    }

    return (
        <div id="responsesPage">
            <Header formId={formId} responseLink={formData?.response_link}/>


            <div className="bg-violet-100 h-screen place-content-center justify-items-center">
                <div className="bg-white rounded-lg m-4 w-3/4 border-4">
                    <div className="flex flex-row items-start justify-between  space-y-4 p-8">
                        <h1 className="font-normal text-lg">{responseCount} Responses</h1>
                        <div className="flex flex-row">
                            <p className="text-gray-500 text-sm">Link to Sheets</p>
                            <IconHover icon={<BsThreeDotsVertical className="h-4 w-4"/>}
                                       text="More Options for Responses"/>
                        </div>

                    </div>
                </div>
                <div className="bg-white rounded-lg m-4 w-3/4 border-4">
                    <div className="flex flex-col items-start  space-y-4 p-8">
                        <button onClick={getResponseData}
                                className="bg-violet-800 hover:bg-violet-600 rounded-md font-semibold px-6 py-2 mx-2 text-xs text-white">Preview
                            Responses CSV
                        </button>
                    </div>
                </div>

                {showPreview && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                        <div className="relative p-5 border w-[75%] h-[50%] shadow-lg rounded-md bg-white">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">CSV Preview</h3>
                                <button onClick={() => setShowPreview(false)} className="text-black">
                                    <span className="text-2xl">&times;</span>
                                </button>
                            </div>
                            <div className="mt-2 px-7 py-3">
                                <div className="overflow-x-auto">
                                    {csvData && csvData.length > 0 ? (
                                        <table className="table-auto w-full">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                {Object.keys(csvData[0]).map((header, index) => (
                                                    <th key={index}
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                                                ))}
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {csvData.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {Object.values(row).map((value, colIndex) => (
                                                        <td key={colIndex}
                                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>No responses to show.</p>
                                    )}
                                </div>
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="px-4 py-2 bg-violet-800 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResponsesPage;