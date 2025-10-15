import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {QuestionType, questionTypeWiseIcon} from "@/constants/questionType";
import {FaChevronDown, FaRegTrashAlt} from "react-icons/fa";
import IconHover from "@/constants/iconHover";
import {MdContentCopy, MdOutlineImage} from "react-icons/md";
import {useState} from "react";

const FormQuestion = (props) => {
    const {editQuestion} = props;
    const [selectedType, setSelectedType] = useState("Multiple Choice");
    const question = "Untitled Question"
    const options = ["Option 1", "Option 2", "Option 3"]


    return (
        <div className="rounded min-w-[80vw] bg-white p-5 border border-gray-300 border-l-4 focus:border-l-[#4285f4] focus:outline-none" tabIndex="0">
            <div className="flex flex-col items-between mb-2">
                <div className="flex flex-row justify-between items-start mb-2">
                    <div className="flex-1">
                        <input
                            value={question}
                            className="w-full text-lg font-medium mb-2 p-1 border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {editQuestion && <div className="flex items-center gap-2">
                        <IconHover icon={<MdOutlineImage size={20}/>} text="Add Inline Image"/>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="flex items-center gap-2 px-3 py-1 border rounded-md hover:bg-gray-50">
                                    <span className="text-gray-600">{questionTypeWiseIcon[selectedType]}</span>
                                    <span>{selectedType}</span>
                                    <FaChevronDown className="h-3 w-3 text-gray-500"/>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[250px] bg-white">
                                <DropdownMenuSeparator/>

                                <DropdownMenuGroup
                                    value={selectedType}
                                    onValueChange={setSelectedType}
                                >
                                    {QuestionType.map((type) => (
                                        <DropdownMenuItem
                                            key={type}
                                            value={type}
                                            className="flex items-center gap-3 h-10"
                                        >
                                            <span className="text-gray-600">
                                                {questionTypeWiseIcon[type]}
                                            </span>
                                            <span>{type}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>}
                </div>
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
            {editQuestion && (
                <div className="flex flex-col items-end gap-2">
                    <hr className="w-full"/>
                    <div className="flex flex-row">
                        <div>
                            <IconHover icon={<MdContentCopy className="text-gray-500" size={20}/>} text="Duplicate Question"/>
                        </div>
                        <div>
                            <IconHover icon={<FaRegTrashAlt className="text-gray-500" size={20}/>} text="Delete Question"/>
                        </div>
                    </div>
                </div>
            )
            }

        </div>
    )
}

export default FormQuestion

