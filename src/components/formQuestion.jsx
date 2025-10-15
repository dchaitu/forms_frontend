import AddElementsTray from "@/components/addElementsTray";
import {useState} from "react";

const FormQuestion = () => {

    const [showEditTray, setShowEditTray] = useState(false)

    const question = "Untitled Question"
    const options = ["Option 1", "Option 2", "Option 3"]
    const showQuestionEditOptions = () => setShowEditTray(!showEditTray)


    return (
        <div className="flex flex-row justify-between">
        <div className="rounded min-w-[80vw] bg-white p-5 border border-gray-300 focus:border-l-[#4285f4]" onClick={showQuestionEditOptions}>
            <div className="flex flex-col items-start mb-2">
                <input value={question}
                       className="w-full text-lg font-medium mb-2 p-1 border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-blue-500"/>
            </div>
            {options.map((option, index) => (
            <div key={index} className="flex items-center my-5">
                <input
                    type="radio"
                    id={`option-${index}`}
                    name="form-options"
                    value={option.toLowerCase().replace(' ', '-')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                    htmlFor={`option-${index}`}
                    className="ml-3 block text-sm font-medium text-gray-700"
                >
                    {option}
                </label>
            </div>
            ))}

        </div>
        <div>
            {showEditTray && <AddElementsTray/>}
        </div>
        </div>
    )
}

export default FormQuestion

