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
import {Switch} from "@/components/ui/switch";
import {BsThreeDotsVertical} from "react-icons/bs";

const FormQuestion = (props) => {
    const {editQuestion} = props;
    const [selectedQuestionType, setSelectedQuestionType] = useState("Multiple Choice");
    const question = "Untitled Question"
    const options = ["Option 1", "Option 2", "Option 3"]

    const renderOptions = () => {
        if (selectedQuestionType === "Multiple Choice") {
            return options.map((option, index) => (
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
            ));
        } else if (selectedQuestionType === "Checkboxes") {
            return options.map((option, index) => (
                <div key={index} className="flex items-center my-5">
                    <input
                        type="checkbox"
                        id={`option-${index}`}
                        name="form-options"
                        value={option.toLowerCase().replace(' ', '-')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                        htmlFor={`option-${index}`}
                        className="ml-3 block text-sm font-medium text-gray-700"
                    >
                        {option}
                    </label>
                </div>
            ));
        } else if (selectedQuestionType === "Dropdown") {
            return options.map((option, index) => (
                <div key={index} className="flex items-center my-5">
                    <span className="mr-2">{index + 1}.</span>
                    <label
                        htmlFor={`option-${index}`}
                        className="block text-sm font-medium text-gray-700"
                    >
                        {option}
                    </label>
                </div>
            ));
        }
        return null;
    };


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
                        <IconHover icon={<MdOutlineImage size={20} className="text-gray-500"/>} text="Add Inline Image"/>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="flex items-center gap-2 px-3 py-1 border rounded-md hover:bg-gray-50">
                                    <span>{questionTypeWiseIcon[selectedQuestionType]}</span>
                                    <span>{selectedQuestionType}</span>
                                    <FaChevronDown className="h-3 w-3 text-gray-500"/>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[250px] bg-white">
                                <DropdownMenuSeparator/>

                                <DropdownMenuGroup>
                                    {QuestionType.map((type) => (
                                        <DropdownMenuItem
                                            key={type}
                                            onSelect={() => setSelectedQuestionType(type)}
                                            className="flex items-center gap-3 h-10"
                                        >
                                            <span>
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
            {renderOptions()}
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
                        <div  className="text-gray-500 flex items-center gap-2">
                            <label htmlFor="required">Required</label>

                            <Switch className="data-[state=checked]:bg-purple-600
                            data-[state=unchecked]:bg-gray-500
                            [&>span]:data-[state=checked]:bg-white
    [&>span]:data-[state=unchecked]:bg-gray-50
                            " id="required"/>

                        </div>
                        <div>
                            <IconHover icon={<BsThreeDotsVertical className="text-gray-500" size={20}/>} text="More Options"/>
                        </div>
                    </div>
                </div>
            )
            }

        </div>
    )
}

export default FormQuestion

