import IconHover from "@/constants/iconHover";
import {BiCollapseVertical} from "react-icons/bi";
import {BsThreeDotsVertical} from "react-icons/bs";
import {useEffect, useRef, useState} from "react";
// import useOnClickOutside from "@/lib/useOnClickOutside";
import {API_BASE_URL} from "@/constants/constants";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";


const FormSection = (props) => {
    const {isSelected, formId, title, description, sectionId: initialSectionId} = props;
    const [sectionName, setSectionName] = useState(title || "Untitled Section");
    const [sectionDescription, setSectionDescription] = useState(description);
    // const [formId, setFormId] = useState(initialFormId);

    const [sectionId, setSectionId] = useState(initialSectionId);
    const placeholderSectionDescription = "Section Description";
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
                                        <DropdownMenuItem key={index} className="p-3">
                                            {option}
                                        </DropdownMenuItem>
                                    ))
                                }
                            </DropdownMenuGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
            )}
        </div>
        </div>


    )
}

export default FormSection