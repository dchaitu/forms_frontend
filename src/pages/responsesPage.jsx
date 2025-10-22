import IconHover from "@/constants/iconHover";
import {BsThreeDotsVertical} from "react-icons/bs";
import Header from "@/constants/header";

const ResponsesPage = () => {
    const noResponses = "No responses. Publish your form to start accepting responses."
    return (
        <div id="responsesPage">
            <Header/>


        <div className="bg-violet-100 h-screen place-content-center justify-items-center">
            <div className="bg-white rounded-lg m-4 w-3/4 border-4">
                <div className="flex flex-row items-start justify-between  space-y-4 p-8">
                    <h1 className="font-normal text-lg">0 Responses</h1>
                    <div className="flex flex-row">
                        <p className="text-gray-500 text-sm">Link to Sheets</p>
                        <IconHover icon={<BsThreeDotsVertical className="h-4 w-4"/>} text="More Options for Responses"/>
                    </div>

                </div>
            </div>
            <div className="bg-white rounded-lg m-4 w-3/4 border-4">
                <div className="flex flex-col items-start  space-y-4 p-8">
                    <p className="text-gray-500 text-sm justify-self-center">{noResponses}</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ResponsesPage;