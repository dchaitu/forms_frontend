import {FaRegCheckSquare, FaRegStar} from "react-icons/fa";
import {IoIosArrowDropdown, IoMdCalendar, IoMdTime} from "react-icons/io";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {MdOutlineLinearScale, MdOutlineShortText, MdRadioButtonChecked} from "react-icons/md";
import {TfiLayoutGrid3Alt} from "react-icons/tfi";
import {CgMenuGridO} from "react-icons/cg";
import {GrTextAlignFull} from "react-icons/gr";

export const QuestionType = [
    "Short Answer",
    "Paragraph",
    "Multiple Choice",
    "Checkboxes",
    "Dropdown",
    "File Upload",
    "Linear Scale",
    "Rating",
    "Multiple Choice grid",
    "Checkbox grid",
    "Date",
    "Time"
]

export const questionTypeWiseIcon = {
    "Short Answer": <MdOutlineShortText className="text-gray-500"/>,
    "Paragraph": <GrTextAlignFull className="text-gray-500"/>,
    "Multiple Choice": <MdRadioButtonChecked className="text-gray-500"/>,
    "Checkboxes": <FaRegCheckSquare className="text-gray-500"/>,
    "Dropdown": <IoIosArrowDropdown className="text-gray-500"/>,
    "File Upload": <AiOutlineCloudUpload className="text-gray-500"/>,
    "Linear Scale": <MdOutlineLinearScale className="text-gray-500"/>,
    "Rating": <FaRegStar className="text-gray-500"/>,
    "Multiple Choice grid": <CgMenuGridO className="text-gray-500"/>,
    "Checkbox grid": <TfiLayoutGrid3Alt className="text-gray-500"/>,
    "Date": <IoMdCalendar className="text-gray-500"/>,
    "Time": <IoMdTime className="text-gray-500"/>
}
