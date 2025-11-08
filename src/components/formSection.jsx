import IconHover from "@/constants/iconHover";
import {BiCollapseVertical} from "react-icons/bi";
import {BsThreeDotsVertical} from "react-icons/bs";
import {useEffect, useRef, useState} from "react";
import {API_BASE_URL} from "@/constants/constants";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import MoveSection from "@/components/moveSection";
import ConfirmDelete from "@/components/deleteSection";
import SectionNavigation from "@/components/sectionNavigation";


const FormSection = (props) => {
    const {isSelected, formId, title, description, sectionId: initialSectionId, showMove, setShowMove,formData, handleSaveReorder, onNavigate} = props;
    const [sectionName, setSectionName] = useState(title || "Untitled Section");
    const [sectionDescription, setSectionDescription] = useState(description);

    const [sectionId, setSectionId] = useState(initialSectionId);
    const [showDelete, setShowDelete] = useState(false);
    const placeholderSectionDescription = "Section Description";

    const handleNavigation = (target) => {
        if(onNavigate) {
            onNavigate(sectionId, target)
        }
    }


    useEffect(() => {
        if (title) setSectionName(title);
        if (description) setSectionDescription(description);
        if(initialSectionId) setSectionId(initialSectionId)
    }, [title, description, initialSectionId]);

    const ref = useRef();
    const sectionOptions = ["Duplicate Section", "Move Section","Delete Section","Merge with above"]
    const saveFormSection = async () => {
        try {
            const isUpdate = !!sectionId;
            console.log("Current section id is ", sectionId)
            console.log("isUpdate ", isUpdate)
            const url = isUpdate ? `${API_BASE_URL}/section/` : `${API_BASE_URL}/section/create/`;
            const method = isUpdate ? 'PUT' : 'POST';
            const updateBody = {
                title: sectionName,
                description: sectionDescription,
                section_id: parseInt(sectionId),
            }
            const createBody = {
                title: sectionName,
                description: sectionDescription,
                form_id: parseInt(formId),
            }
            const responseBody = isUpdate? updateBody : createBody;
            const resp = await fetch(url,
                {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(responseBody),
                })
            const response = await resp.json();
            if (!isUpdate && response.id) {
                setSectionId(response.id);
            }
        }
        catch (error) {
            console.error('Error saving form header:', error);
        }

    }

    const moveSection = (sectionOption)=> {
        if(sectionOption ==="Move Section")
        {
            setShowMove(true);
            console.log("Moving Section")
        }
    }
    const deleteSection = (sectionOption) => {
        if(sectionOption === "Delete Section") {
            setShowDelete(true);
        }
    };

    const confirmDeleteSection = async () => {
        if (props.onDelete) {
            await props.onDelete(sectionId);
        }
        setShowDelete(false);
    };


    return (

        <div ref={ref} className="border-gray-700 mx-auto" >
        <div className="flex flex-row p-5 bg-white rounded my-2 focus:outline-none border-t-8 border-t-[rgb(103,58,183)] border-l-4 focus:border-l-[#4285f4] border-r-0 border-b-0" tabIndex="0">
            <div className="flex flex-col">
                <input placeholder="Untitled Form" value={sectionName} onChange={(e) => setSectionName(e.target.value)} className="rounded py-1 text-3xl"/>
                <input placeholder={placeholderSectionDescription} value={sectionDescription} onChange={(e) => setSectionDescription(e.target.value)}/>
            </div>
            {isSelected &&(
                <div className="flex items-start ml-auto">
                    <button onClick={saveFormSection}
                            className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                        Save
                    </button>
                    <IconHover icon={<BiCollapseVertical
                        size={20} className="text-gray-500"/>} text="Collapse section"/>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                    <button className="ml-2 px-2  rounded-full hover:bg-gray-100 cursor-pointer">
                    <IconHover icon={<BsThreeDotsVertical size={20} className="text-gray-500"/>} text="More"/>
                    </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                            <DropdownMenuGroup>
                                {
                                    sectionOptions.map((option, index) => (
                                        <DropdownMenuItem key={index} className="p-3" onClick={() => {
                                            moveSection(option)
                                            deleteSection(option)
                                        }}>
                                            {option}
                                        </DropdownMenuItem>
                                    ))
                                }
                            </DropdownMenuGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
            )}
            {
                showMove && (
                    <MoveSection
                        sections={formData.sections}
                        onClose={() => setShowMove(false)}
                        onSave={handleSaveReorder}
                    />
                )
            }
            {showDelete && (
                <ConfirmDelete
                    title="Delete questions and section?"
                    message="Deleting a section also deletes the questions and responses it contains.
                    To preserve the questions, choose Merge section up from the section options."
                    onConfirm={confirmDeleteSection}
                    onCancel={() => setShowDelete(false)}
                />
            )}
        </div>
            {isSelected && formData?.sections?.length > 1 && (
                    <SectionNavigation
                        sections={formData.sections}
                        currentSectionId={sectionId}
                        onNavigate={handleNavigation}
                    />
                )
            }
        </div>


    )
}

export default FormSection