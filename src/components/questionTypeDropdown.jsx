import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {QuestionType, questionTypeWiseIcon} from "@/constants/questionType";
import {FaChevronDown} from "react-icons/fa";

const QuestionTypeDropdown = ({selectedQuestionType, setSelectedQuestionType}) => {
    return (
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
    )
}

export default QuestionTypeDropdown;