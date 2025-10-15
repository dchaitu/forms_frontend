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
    "Short Answer": <MdOutlineShortText/>,
    "Paragraph": <GrTextAlignFull />,
    "Multiple Choice": <MdRadioButtonChecked/>,
    "Checkboxes": <FaRegCheckSquare/>,
    "Dropdown": <IoIosArrowDropdown/>,
    "File Upload": <AiOutlineCloudUpload/>,
    "Linear Scale": <MdOutlineLinearScale/>,
    "Rating": <FaRegStar/>,
    "Multiple Choice grid": <CgMenuGridO/>,
    "Checkbox grid": <TfiLayoutGrid3Alt/>,
    "Date": <IoMdCalendar/>,
    "Time": <IoMdTime/>
}
