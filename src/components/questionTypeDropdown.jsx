import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {QuestionTypeList, questionTypeLabel, questionTypeWiseIcon} from "@/constants/questionType";
import {FaChevronDown} from "react-icons/fa";

const QuestionTypeDropdown = ({selectedQuestionType, setSelectedQuestionType}) => {

    console.log("selectedQuestionType ",selectedQuestionType);
    console.log("questionTypeWiseIcon", questionTypeWiseIcon[selectedQuestionType]);
    console.log("questionTypeLabel", questionTypeLabel[selectedQuestionType]);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="flex items-center gap-2 px-3 py-1 border rounded-md hover:bg-gray-50">
                    <span>{questionTypeWiseIcon[selectedQuestionType]}</span>
                    <span>{questionTypeLabel[selectedQuestionType]}</span>
                    <FaChevronDown className="h-3 w-3 text-gray-500"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[250px] bg-white">
                <DropdownMenuSeparator/>

                <DropdownMenuGroup>
                    {QuestionTypeList.map((type) => (
                        <DropdownMenuItem
                            key={type}
                            onSelect={(e) => {
                                e.preventDefault();
                                setSelectedQuestionType(type)
                            }}
                            className={`flex items-center gap-3 h-10 ${
                                selectedQuestionType === type ? "bg-gray-100 font-medium" : ""
                            } text-gray-900`}
                        >
                            <span>
                                {questionTypeWiseIcon[type]}
                            </span>
                            <span>{questionTypeLabel[type]}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default QuestionTypeDropdown;