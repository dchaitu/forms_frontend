import {FaRegTrashAlt} from "react-icons/fa";
import IconHover from "@/constants/iconHover";
import {IoMdImage, IoMdTrash} from "react-icons/io";
import {
    MdContentCopy,
    MdFormatAlignCenter,
    MdFormatAlignLeft, MdFormatAlignRight,
    MdOutlineImage,
} from "react-icons/md";
import {useRef, useState} from "react";
import {Switch} from "@/components/ui/switch";
import {BsThreeDotsVertical} from "react-icons/bs";
import QuestionTypeDropdown from "@/components/questionTypeDropdown";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuCheckboxItem, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {QuestionType} from "@/constants/questionType";
import QuestionOptions from "./questionOptions";
import {API_BASE_URL} from "@/constants/constants";

const FormQuestionEdit = (props) => {
    const {editQuestion, questionData, sectionId, deleteQuestion, saveQuestion} = props;
    const [selectedQuestionType, setSelectedQuestionType] = useState(questionData?.question_type || QuestionType.MULTIPLE_CHOICE);
    const [selectedStartValue, setSelectedStartValue] = useState(0);
    const [selectedEndValue, setSelectedEndValue] = useState(5);
    const [question, setQuestion] = useState(questionData?.title || "Untitled Question")
    const [description, setDescription] = useState(questionData?.description)
    const [options, setOptions] = useState(questionData?.options || []);
    const [questionIsRequired, setQuestionIsRequired] = useState(questionData?.is_required || false);
    const [image, setImage] = useState(questionData?.question_image ? `data:image/png;base64,${questionData.question_image}` : null);
    const [imageHover, setImageHover] = useState(false);
    const imageInputRef = useRef(null);
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
            if (image) {
                updatedQuestion.question_image = image.replace('data:image/png;base64,', '');
            }

            if (selectedQuestionType === QuestionType.LINEAR_SCALE) {
                updatedQuestion.start_scale = selectedStartValue;
                updatedQuestion.end_scale = selectedEndValue;
            }
            // TODO: Add support for start and end label
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


    const handleImageUpload = async (event) => {
        console.log('handleImageUpload called', event.target.files);

        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch(`${API_BASE_URL}/question/upload_image/${questionData.id}`, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Image upload data ",data);
                    setImage(`data:image/png;base64,${data.question_image}`);
                    event.target.value = '';
                } else {
                    console.error('Image upload failed');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleOptionImageUpload = async (event, optionId) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch(`${API_BASE_URL}/option/upload_image/${optionId}`, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    const newOptions = options.map(opt => {
                        if (opt.id === optionId) {
                            return { ...opt, image_url: `data:image/png;base64,${data.option_image}` };
                        }
                        return opt;
                    });
                    setOptions(newOptions);
                } else {
                    console.error('Image upload failed');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };



    return (
        <div className="rounded mx-auto bg-white p-5 border border-gray-300 border-l-4 focus:border-l-[#4285f4] focus:outline-none" tabIndex="0">
            <div className="flex flex-col items-between mb-2">
                <div className="flex flex-row justify-between items-start mb-2">
                    <div className={"flex-1"} onMouseEnter={() => setImageHover(true)} onMouseLeave={() => setImageHover(false)}>
                        {image &&
                            <div className="relative">
                                <img src={image} alt="question" className="mb-2 cursor-pointer" onClick={() => imageInputRef.current?.click()}/>
                                {image &&
                                    <div className="absolute top-2 left-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <BsThreeDotsVertical className="text-gray-500" size={20}/>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="bg-white">
                                                <DropdownMenuItem className="m-2">

                                                    <MdFormatAlignLeft className="text-gray-500" size={16} />
                                                    <span>Left Align</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="m-2">

                                                    <MdFormatAlignCenter className="text-gray-500" size={16} />
                                                    <span>Center Align</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="m-2">
                                                    <MdFormatAlignRight className="text-gray-500" size={16} />
                                                    <span>Right Align</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="m-2" onClick={() => imageInputRef.current?.click()}>
                                                    <IoMdImage className="text-gray-500" size={16} />
                                                    <span>Change</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="m-2" onClick={() => setImage(null)}>
                                                    <IoMdTrash className="text-gray-500" size={16} />
                                                    <span>Remove</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                }
                            </div>
                        }
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
                        <input
                            type="file"
                            ref={imageInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                            accept="image/*"
                        />
                        <IconHover icon={<MdOutlineImage size={20} className="text-gray-500"/>} text="Add Inline Image" onClick={() => imageInputRef.current?.click()}/>
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
                handleOptionImageUpload={handleOptionImageUpload}
                selectedStartValue={selectedStartValue}
                setSelectedStartValue={setSelectedStartValue}
                selectedEndValue={selectedEndValue}
                setSelectedEndValue={setSelectedEndValue}
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