import IconHover from "@/constants/iconHover";
import {CiCirclePlus} from "react-icons/ci";
import {BiSolidFileImport} from "react-icons/bi";
import {MdOutlineImage, MdOutlineTextFields} from "react-icons/md";
import {GoRows, GoVideo} from "react-icons/go";

const AddElementsTray = () => {
    const iconSize = 20;
    const iconComponents = [
        <IconHover icon={<CiCirclePlus size={iconSize}/>} text="Add question"/>,
        <IconHover icon={<BiSolidFileImport size={iconSize}/>} text="Import questions"/>,
        <IconHover icon={<MdOutlineTextFields size={iconSize}/>} text="Add title and description"/>,
        <IconHover icon={<MdOutlineImage size={iconSize}/>} text="Add Image"/>,
        <IconHover icon={<GoVideo size={iconSize}/>} text="Add video"/>,
        <IconHover icon={<GoRows size={iconSize}/>} text="Add section"/>
    ]
    return (
        <div className="flex flex-col bg-white rounded-lg py-2 shadow-lg m-2">
            {iconComponents.map((iconComponent, index) => (
                <div key={index} className="flex items-center my-3">
                    {iconComponent}
                </div>
            ))}


        </div>
    )
}
export default AddElementsTray