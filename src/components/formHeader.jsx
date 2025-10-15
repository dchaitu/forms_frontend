import AddElementsTray from "@/components/addElementsTray";
import {useState} from "react";

const FormHeader = () => {
    const [showEditTray, setShowEditTray] = useState(false)
    const headerName = "Untitled Form"
    const headerDescription = "Form Description"
    const showQuestionEditOptions = () => setShowEditTray(!showEditTray)

    return (
        <div className="flex flex-row justify-between">
            <div>
        <div className="border-gray-700 min-w-[80vw]" onClick={showQuestionEditOptions}>
        <div className="flex flex-col p-5 bg-white rounded my-2  border-t-8 border-t-[rgb(103,58,183)] border-l-4 focus:border-l-[#4285f4] border-r-0 border-b-0">
            <input placeholder="Untitled Form" value={headerName} className=" rounded py-1 text-3xl"/>
            <input placeholder={headerDescription}/>
        </div>
        </div>
            </div>
            <div>
                {showEditTray && <AddElementsTray/>}
            </div>

        </div>
    )
}

export default FormHeader