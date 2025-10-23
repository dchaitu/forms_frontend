import {FaRegTrashAlt, FaRegStar} from "react-icons/fa";
import IconHover from "@/constants/iconHover";
import {MdContentCopy, MdOutlineImage, MdClose} from "react-icons/md";
import {useState} from "react";
import {Switch} from "@/components/ui/switch";
import {BsThreeDotsVertical} from "react-icons/bs";
import QuestionTypeDropdown from "@/components/questionTypeDropdown";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuCheckboxItem,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {ChevronDownIcon} from "lucide-react";
import {API_BASE_URL} from "@/constants/constants";
import {QuestionType} from "@/constants/questionType";

const FormQuestion = (props) => {
    const {editQuestion, questionData} = props;
    const [selectedQuestionType, setSelectedQuestionType] = useState(questionData?.question_type || QuestionType.MULTIPLE_CHOICE);
    const [selectedStartValue, setSelectedStartValue] = useState(0);
    const [selectedEndValue, setSelectedEndValue] = useState(5);
    const [question, setQuestion] = useState(questionData?.title || "Untitled Question")
    const [description, setDescription] = useState(questionData?.description || "Description (optional)")
    const [options, setOptions] = useState(questionData?.options?.map(o => o.text) || []);
    const [questionIsRequired, setQuestionIsRequired] = useState(false);
    const gridOptions = {
        rows: ["Row 1", "Row 2"],
        columns: ["Column 1", "Column 2", "Column 3"]
    };
    const [showDescription, setShowDescription] = useState(false);
    const [showGoToSection, setShowGoToSection] = useState(false);
    const [showShuffleOptionOrder, setShowShuffleOptionOrder] = useState(false);

    const sectionId = 1;
    const handleOptionChange = (index, newText) => {
        const newOptions = [...options];
        newOptions[index] = newText;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, `Option ${options.length + 1}`]);
    };

    const removeOption = (index) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const saveQuestion = async () => {
        const resp =   await fetch(`${API_BASE_URL}/question/create/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    section_id: sectionId,
                    title: question,
                    description: description,
                    question_type: selectedQuestionType.value ? selectedQuestionType.value : selectedQuestionType,
                    is_required: questionIsRequired,
                    // options: options, // Add options to the payload
                }),
            });
        const data = await resp.json();
        console.log(data);
    }
    const deleteQuestion = async () => {
        const resp = await fetch(`${API_BASE_URL}/question/${questionData.id}/`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: questionData.id,
                }),
            });
        const data = await resp.json();
        console.log(data);
    }

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

    const saveOption = async () => {
        for (let option of options) {
            const resp = await fetch(`${API_BASE_URL}/question/create/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question_id: sectionId,
                        text: option,

                    }),
                });
            const data = await resp.json();
            console.log(data);
        }
    }

    const renderOptions = () => {
        if (selectedQuestionType === QuestionType.MULTIPLE_CHOICE) {
            if (editQuestion) {
                return (
                    <div>
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center my-2">
                                <input type="radio" className="h-4 w-4 text-gray-400" disabled />
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="ml-3 p-1 border-b-2 border-transparent focus:border-blue-500 focus:outline-none"
                                />
                                <button onClick={() => removeOption(index)} className="ml-2 text-gray-500 hover:text-gray-700">
                                    <MdClose />
                                </button>
                            </div>
                        ))}
                        <div className="flex items-center my-2">
                            <input type="radio" className="h-4 w-4 text-gray-400" disabled />
                            <button onClick={addOption} className="ml-3 text-blue-600 hover:text-blue-800">
                                Add option
                            </button>
                        </div>
                    </div>
                );
            }
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
        } else if (selectedQuestionType === QuestionType.CHECKBOXES) {
            if (editQuestion) {
                return (
                    <div>
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center my-2">
                                <input type="checkbox" className="h-4 w-4 text-gray-400 rounded" disabled />
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="ml-3 p-1 border-b-2 border-transparent focus:border-blue-500 focus:outline-none"
                                />
                                <button onClick={() => removeOption(index)} className="ml-2 text-gray-500 hover:text-gray-700">
                                    <MdClose />
                                </button>
                            </div>
                        ))}
                        <div className="flex items-center my-2">
                            <input type="checkbox" className="h-4 w-4 text-gray-400 rounded" disabled />
                            <button onClick={addOption} className="ml-3 text-blue-600 hover:text-blue-800">
                                Add option
                            </button>
                        </div>
                    </div>
                );
            }
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
        } else if (selectedQuestionType === QuestionType.DROPDOWN) {
            if (editQuestion) {
                return (
                    <div>
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center my-2">
                                <span className="mr-2">{index + 1}.</span>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="p-1 border-b-2 border-transparent focus:border-blue-500 focus:outline-none"
                                />
                                <button onClick={() => removeOption(index)} className="ml-2 text-gray-500 hover:text-gray-700">
                                    <MdClose />
                                </button>
                            </div>
                        ))}
                        <div className="flex items-center my-2">
                            <span className="mr-2">{options.length + 1}.</span>
                            <button onClick={addOption} className="text-blue-600 hover:text-blue-800">
                                Add option
                            </button>
                        </div>
                    </div>
                );
            }
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
        } else if (selectedQuestionType === QuestionType.TEXT) {
            return (
                <div className="my-3 flex items-start gap-2">
                    <input
                        type="text"
                        placeholder="Short answer text"
                        className="w-1/2 p-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                        disabled
                    />
                </div>
            );
        } else if (selectedQuestionType === QuestionType.PARAGRAPH) {
            return (
                <div className="my-5">
                    <textarea
                        placeholder="Long answer text"
                        className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                        disabled
                    />
                </div>
            );
        } else if (selectedQuestionType === QuestionType.FILE_UPLOAD) {
            return (
                <div className="my-5">
                    <div className="flex items-center gap-2 p-3 border border-dashed rounded-md w-fit">
                        <AiOutlineCloudUpload size={24} className="text-gray-500"/>
                        <span className="text-gray-700">File upload</span>
                    </div>
                </div>
            );
        } else if (selectedQuestionType === "Linear Scale") {
            const start = [0,1];
            const end = [2,3,4,5,6,7,8,9,10]
            return (
                <div className="my-5 flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex flex-row">
                                <button>{selectedStartValue} </button>
                                <ChevronDownIcon className="ml-1 h-4 w-4" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                {start.map((type) => (
                                    <DropdownMenuItem
                                        key={type}
                                        onSelect={() => setSelectedStartValue(type)}
                                        className="flex items-center gap-3 h-10"
                                    >
                                        <span>{type}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    to
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex flex-row">
                                <button>{selectedEndValue} </button>
                                <ChevronDownIcon className="ml-1 h-4 w-4" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                {end.map((type) => (
                                    <DropdownMenuItem
                                        key={type}
                                        onSelect={() => setSelectedEndValue(type)}
                                        className="flex items-center gap-3 h-10"
                                    >
                                        <span>{type}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex flex-col items-center">
                        <input type="text" placeholder="Label (optional)" className="w-[100%] p-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none" />
                        <input type="text" placeholder="Label (optional)" className="w-[100%] p-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none" />

                    </div>
                </div>
            );
        } else if (selectedQuestionType === QuestionType.RATING) {
            return (
                <div className="my-5 flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(value => (
                        <FaRegStar key={value} size={24} className="text-yellow-500 cursor-pointer"/>
                    ))}
                </div>
            );
        } else if (selectedQuestionType === QuestionType.MULTIPLE_CHOICE_GRID) {
            return (
                <div className="my-5">
                    <table className="w-full">
                        <thead>
                        <tr>
                            <th></th>
                            {gridOptions.columns.map((col, colIndex) => (
                                <th key={colIndex} className="p-2 text-sm font-medium text-gray-700">{col}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {gridOptions.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="p-2 text-sm font-medium text-gray-700">{row}</td>
                                {gridOptions.columns.map((col, colIndex) => (
                                    <td key={colIndex} className="p-2 text-center">
                                        <input type="radio" name={`grid-row-${rowIndex}`} className="h-4 w-4"/>
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
        } else if (selectedQuestionType === QuestionType.CHECKBOX_GRID) {
            return (
                <div className="my-5">
                    <table className="w-full">
                        <thead>
                        <tr>
                            <th></th>
                            {gridOptions.columns.map((col, colIndex) => (
                                <th key={colIndex} className="p-2 text-sm font-medium text-gray-700">{col}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {gridOptions.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="p-2 text-sm font-medium text-gray-700">{row}</td>
                                {gridOptions.columns.map((col, colIndex) => (
                                    <td key={colIndex} className="p-2 text-center">
                                        <input type="checkbox" className="h-4 w-4 rounded"/>
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
        } else if (selectedQuestionType === QuestionType.DATE) {
            return (
                <div className="my-5">
                    <input type="date" className="p-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"/>
                </div>
            );
        } else if (selectedQuestionType === QuestionType.TIME) {
            return (
                <div className="my-5">
                    <input type="time" className="p-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"/>
                </div>
            );
        }
        return null;
    };


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
            {renderOptions()}
            {editQuestion && (
                <div className="flex flex-col items-end gap-2">
                    <hr className="w-full"/>
                    <div className="flex flex-row">
                        <div>
                            <button onClick={saveQuestion}

                                className="bg-blue-500 text-white px-4 py-1 rounded"
                            >
                                Save
                            </button>
                        </div>
                        <div>
                            <IconHover icon={<MdContentCopy className="text-gray-500" size={20}/>} text="Duplicate Question"/>
                        </div>
                        <div onClick={deleteQuestion}>
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

export default FormQuestion