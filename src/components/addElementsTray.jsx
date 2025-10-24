import IconHover from "@/constants/iconHover";
import {CiCirclePlus} from "react-icons/ci";
import {BiSolidFileImport} from "react-icons/bi";
import {MdOutlineImage, MdOutlineTextFields} from "react-icons/md";
import {GoRows, GoVideo} from "react-icons/go";

const AddElementsTray = (props) => {
    const { addQuestion, addTitleAndDescription, addSection, addImage, addVideo, addImportQuestions } = props;
    const iconSize = 20;
    return (
        <div className="flex flex-col bg-white rounded-lg py-2 shadow-lg m-2">
            <div onClick={addQuestion} className="flex items-center my-3 cursor-pointer">
                <IconHover icon={<CiCirclePlus size={iconSize} className="text-gray-500"/>} text="Add question"/>
            </div>
            <div onClick={addImportQuestions} className="flex items-center my-3">
                <IconHover icon={<BiSolidFileImport size={iconSize} className="text-gray-500"/>} text="Import questions"/>
            </div>
            <div onClick={addImage}  className="flex items-center my-3">
                <IconHover icon={<MdOutlineTextFields size={iconSize} className="text-gray-500"/>} text="Add title and description"/>
            </div>
            <div onClick={addTitleAndDescription}  className="flex items-center my-3">
                <IconHover icon={<MdOutlineImage size={iconSize} className="text-gray-500"/>} text="Add Image"/>
            </div>
            <div onClick={addVideo}  className="flex items-center my-3">
                <IconHover icon={<GoVideo size={iconSize} className="text-gray-500"/>} text="Add video"/>
            </div>
            <div onClick={addSection}  className="flex items-center my-3">
                <IconHover icon={<GoRows size={iconSize} className="text-gray-500"/>} text="Add section"/>
            </div>
        </div>
    );
}
export default AddElementsTray