import IconHover from "@/constants/iconHover";
import {MdContentCopy} from "react-icons/md";
import {FaRegTrashAlt} from "react-icons/fa";
import {BsThreeDotsVertical} from "react-icons/bs";
import {useEffect, useState} from "react";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {API_BASE_URL} from "@/constants/constants";

const FormTitleAndDescription = (props) => {
    const {editTitleAndDescription, title: initialTitle, description: initialDescription, onSave} = props;
    const [title, setTitle] = useState(initialTitle || "Title");
    const [description, setDescription] = useState(initialDescription || "Description (optional)")
    const [showDescription, setShowDescription] = useState(!!initialDescription);
    const menuOptions = [
        {
            label: "Description",
            state: showDescription,
            setState: setShowDescription
        }
    ];


    return (
        <div
            className="flex p-5 bg-white shadow rounded-lg my-2 focus:outline-none border-l-4 focus:border-l-[#4285f4] border-r-0 border-b-0"
            tabIndex="0">
            <div className="w-full flex flex-row justify-between items-start mb-2">
                <div className="flex flex-col items-start">
                    <div className="w-full">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-lg font-medium mb-2 p-1 border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {showDescription &&
                        <div className="w-full text-gray-500">
                            <input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full text-sm mb-2 p-1 border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                        </div>}

                </div>
                {editTitleAndDescription && (
                    <div className="flex  flex-col  items-end">

                        <div className="flex flex-row">
                            <div>
                                <button onClick={() => onSave({title, description})}
                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                >
                                    Save
                                </button>
                            </div>
                            <div>
                                <IconHover icon={<MdContentCopy className="text-gray-500" size={20}/>} text="Duplicate Question"/>
                            </div>
                            <div>
                                <IconHover icon={<FaRegTrashAlt className="text-gray-500" size={20}/>} text="Delete Question"/>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="ml-2 px-2 rounded-full hover:bg-gray-100 cursor-pointer">
                                        <BsThreeDotsVertical className="text-gray-500" size={20}/>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white">
                                    <DropdownMenuSeparator/>
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
                )
                }
            </div>
        </div>
    )
}

export default FormTitleAndDescription;