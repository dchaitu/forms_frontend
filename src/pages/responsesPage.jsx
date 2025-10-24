import IconHover from "@/constants/iconHover";
import {BsThreeDotsVertical} from "react-icons/bs";
import Header from "@/constants/header";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "@/constants/constants";
import {useParams} from "react-router-dom";

const ResponsesPage = () => {
    const {formId} = useParams();
    const noResponses = "No responses. Publish your form to start accepting responses."
    const [responseCount, setResponseCount] = useState(0);
    const [formData, setFormData] = useState(null);


    useEffect(() => {
        const getResponseCount = async () => {
            const resp = await fetch(`${API_BASE_URL}/response/${formId}/count/`);
            const data = await resp.json();
            setResponseCount(data.count);
        };
        getResponseCount();
    }, [formId])

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(`${API_BASE_URL}/form/${formId}/complete/`);
            const data = await resp.json();
            setFormData(data);
        }
        fetchData();
    }, [formId]);

    const getResponseData = async () => {
        const resp = await fetch(`${API_BASE_URL}/response/${formId}/csv`);
        const data = await resp.blob();
        console.log(data);
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'responses.csv');
        document.body.appendChild(link);
        link.click();
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
                        <IconHover icon={<BsThreeDotsVertical className="h-4 w-4"/>} text="More Options for Responses"/>
                    </div>

                </div>
            </div>
            <div className="bg-white rounded-lg m-4 w-3/4 border-4">
                <div className="flex flex-col items-start  space-y-4 p-8">
                    <p className="text-gray-500 text-sm justify-self-center">{noResponses}</p>
                    <button onClick={getResponseData} className="bg-violet-800 hover:bg-violet-600 rounded-md font-semibold px-6 py-2 mx-2 text-xs text-white">Get Responses JSON</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ResponsesPage;