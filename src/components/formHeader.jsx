import IconHover from "@/constants/iconHover";
import {BiCollapseVertical} from "react-icons/bi";
import {BsThreeDotsVertical} from "react-icons/bs";
import {useEffect, useRef, useState} from "react";
import useOnClickOutside from "@/lib/useOnClickOutside";
import {API_BASE_URL} from "@/constants/constants";


const FormHeader = (props) => {
    const {isSelected, formId: initialFormId} = props;
    const [headerName, setHeaderName] = useState("Untitled Form");
    const [headerDescription, setHeaderDescription] = useState("Form Description");
    const [formId, setFormId] = useState(initialFormId);

    const ref = useRef();

    const saveFormHeader = async () => {
        try {
            const isUpdate = !!formId;
            const url = isUpdate ? `${API_BASE_URL}/form/${formId}/` : `${API_BASE_URL}/form/create/`;
            const method = isUpdate ? 'PUT' : 'POST';

            const resp = await fetch(url,
                {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: headerName,
                        description: headerDescription,
                    }),
                })
            const response = await resp.json();
            console.log(response);
            if (!isUpdate && response.id) {
                setFormId(response.id);
            }
        }
        catch (error) {
            console.error('Error saving form header:', error);
        }

    }

    useOnClickOutside(ref, () => {
        if (isSelected) {
            console.log('Saving form header data:', { headerName, headerDescription });
            saveFormHeader();
        }
    });

    return (

        <div ref={ref} className="border-gray-700 min-w-[80vw]" >
        <div className="flex flex-row p-5 bg-white rounded my-2 focus:outline-none border-t-8 border-t-[rgb(103,58,183)] border-l-4 focus:border-l-[#4285f4] border-r-0 border-b-0" tabIndex="0">
            <div className="flex flex-col">
                <input placeholder="Untitled Form" value={headerName} onChange={(e) => setHeaderName(e.target.value)} className="rounded py-1 text-3xl"/>
                <input placeholder={headerDescription} value={headerDescription} onChange={(e) => setHeaderDescription(e.target.value)}/>
            </div>
            {isSelected &&(
                <div className="flex items-start ml-auto">
                    <IconHover icon={<BiCollapseVertical
                        size={20} className="text-gray-500"/>} text="Add Inline Image"/>
                    <IconHover icon={<BsThreeDotsVertical size={20} className="text-gray-500"/>} text="Add Inline Image"/>
                </div>
            )}
        </div>
        </div>


    )
}

export default FormHeader