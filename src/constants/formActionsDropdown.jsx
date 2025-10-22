import React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    MdContentCopy,
    MdFormatAlignJustify,
} from "react-icons/md";
import { FaRegTrashAlt, FaRegKeyboard } from "react-icons/fa";
import { ImEmbed } from "react-icons/im";
import { IoPrintSharp, IoExtensionPuzzleOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

const FormActionsDropdown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="p-2 mx-2 rounded-full hover:bg-gray-200 cursor-pointer">
                    <BsThreeDotsVertical size={15} className="text-gray-500" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
                <DropdownMenuItem>
                    <MdContentCopy className="mr-2 h-4 w-4" />
                    <span>Make a copy</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <FaRegTrashAlt className="mr-2 h-4 w-4" />
                    <span>Move to Trash</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <MdFormatAlignJustify className="mr-2 h-4 w-4" />
                    <span>Pre-fill form</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ImEmbed className="mr-2 h-4 w-4" />
                    <span>Embed HTML</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <IoPrintSharp className="mr-2 h-4 w-4" />
                    <span>Print</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <IoExtensionPuzzleOutline className="mr-2 h-4 w-4" />
                    <span>Get add-ons</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <FaRegKeyboard className="mr-2 h-4 w-4" />
                    <span>Keyboard Shortcuts</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default FormActionsDropdown;
