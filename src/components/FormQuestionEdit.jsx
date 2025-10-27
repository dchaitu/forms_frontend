import {FaRegTrashAlt} from "react-icons/fa";
import IconHover from "@/constants/iconHover";
import {MdContentCopy, MdOutlineImage} from "react-icons/md";
import {useState} from "react";
import {Switch} from "@/components/ui/switch";
import {BsThreeDotsVertical} from "react-icons/bs";
import QuestionTypeDropdown from "@/components/questionTypeDropdown";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuCheckboxItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {QuestionType} from "@/constants/questionType";
import QuestionOptions from "./questionOptions";

const FormQuestionEdit = (props) => {
    const {editQuestion, questionData, sectionId, deleteQuestion, saveQuestion} = props;
    const [selectedQuestionType, setSelectedQuestionType] = useState(questionData?.question_type || QuestionType.MULTIPLE_CHOICE);
    const [selectedStartValue, setSelectedStartValue] = useState(0);
    const [selectedEndValue, setSelectedEndValue] = useState(5);
    const [question, setQuestion] = useState(questionData?.title || "Untitled Question")
    const [description, setDescription] = useState(questionData?.description)
    const [options, setOptions] = useState(questionData?.options || []);
    const [questionIsRequired, setQuestionIsRequired] = useState(questionData?.is_required || false);
    const gridOptions = {
        rows: ["Row 1", "Row 2"],
        columns: ["Column 1", "Column 2", "Column 3"]
    };
    const [showDescription, setShowDescription] = useState(false);
    const [showGoToSection, setShowGoToSection] = useState(false);
    const [showShuffleOptionOrder, setShowShuffleOptionOrder] = useState(false);

    const handleOptionChange = (index, newText) => {
        const newOptions = [...options];
        newOptions[index] = { ...newOptions[index], text: newText };
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, { text: `Option ${options.length + 1}` }]);
    };

    const removeOption = (index) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };
    
        const saveUpdatedQuestion = async () => {
            const updatedQuestion = {
                ...questionData,
                title: question,
                description: description,
                options: options,
                is_required: questionIsRequired,
                question_type: selectedQuestionType,
                section_id: sectionId
            };
            await saveQuestion(questionData.id, updatedQuestion);
        };
    
        const menuOptions = [
            {
                label: "Description",
                state: showDescription,
                setState: setShowDescription
            },
            {
                label: "Go to section based on answer",
                state: showGoToSection,
                setState: setShowGoToSection
            },
            {
                label: "Shuffle option order",
                state: showShuffleOptionOrder,
                setState: setShowShuffleOptionOrder
            }
        ];




    return (
        <div className="rounded min-w-[80vw] bg-white p-5 border border-gray-300 border-l-4 focus:border-l-[#4285f4] focus:outline-none" tabIndex="0">
            <div className="flex flex-col items-between mb-2">
                <div className="flex flex-row justify-between items-start mb-2">
                    <div className="flex-1">
                        <input placeholder={question}
                            value={question}
                               onChange={(e)=> setQuestion(e.target.value)}
                            className="w-full text-lg font-medium mb-2 p-1 border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {showDescription && <div className="flex-1">
                        <input
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                            className="w-full text-sm mb-2 p-1 border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>}
                    {editQuestion && <div className="flex items-center gap-2">
                        <IconHover icon={<MdOutlineImage size={20} className="text-gray-500"/>} text="Add Inline Image"/>
                        <QuestionTypeDropdown selectedQuestionType={selectedQuestionType}
                                              setSelectedQuestionType={setSelectedQuestionType}/>
                    </div>}
                </div>
            </div>
            <QuestionOptions
                selectedQuestionType={selectedQuestionType}
                editQuestion={editQuestion}
                options={options}
                setOptions={setOptions}
                handleOptionChange={handleOptionChange}
                addOption={addOption}
                removeOption={removeOption}
            />
            {editQuestion && (
                <div className="flex flex-col items-end gap-2">
                    <hr className="w-full"/>
                    <div className="flex flex-row">
                        <div>
                            <button onClick={saveUpdatedQuestion}

                                className="bg-blue-500 text-white px-4 py-1 rounded"
                            >
                                Save
                            </button>
                        </div>
                        <div>
                            <IconHover icon={<MdContentCopy className="text-gray-500" size={20}/>} text="Duplicate Question"/>
                        </div>
                        <div onClick={() => deleteQuestion(questionData.id)}>
                            <IconHover icon={<FaRegTrashAlt className="text-gray-500" size={20}/>} text="Delete Question"/>
                        </div>
                        <div  className="text-gray-500 flex items-start gap-2">
                            <label htmlFor="required">Required</label>

                            <Switch className="data-[state=checked]:bg-purple-600
                            data-[state=unchecked]:bg-gray-500
                            [&>span]:data-[state=checked]:bg-white
                            [&>span]:data-[state=unchecked]:bg-gray-50"
                                    id="required"
                                    checked={questionIsRequired}
                                    onCheckedChange={setQuestionIsRequired}
                            />

                        </div>
                        <div className="flex items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="ml-2 px-2  rounded-full hover:bg-gray-100 cursor-pointer">
                                        <BsThreeDotsVertical className="text-gray-500" size={20}/>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white">
                                    <DropdownMenuLabel>Show</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuGroup>
                                        {menuOptions.map((item) => (
                                            <DropdownMenuCheckboxItem
                                                key={item.label}
                                                checked={item.state}
                                                onCheckedChange={item.setState}
                                                className="flex items-center gap-3 h-10"
                                            >
                                                <span>{item.label}</span>
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            )
            }

        </div>
    )
}

export default FormQuestionEdit;