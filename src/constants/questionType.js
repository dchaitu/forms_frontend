import {FaRegCheckSquare, FaRegStar} from "react-icons/fa";
import {IoIosArrowDropdown, IoMdCalendar, IoMdTime} from "react-icons/io";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {MdOutlineLinearScale, MdOutlineShortText, MdRadioButtonChecked} from "react-icons/md";
import {TfiLayoutGrid3Alt} from "react-icons/tfi";
import {CgMenuGridO} from "react-icons/cg";
import {GrTextAlignFull} from "react-icons/gr";

export const QuestionType = {
    TEXT: "text",
    PARAGRAPH: "paragraph",
    DATE: "date",
    TIME: "time",
    MULTIPLE_CHOICE: "multiple_choice",
    CHECKBOXES: "checkboxes",
    DROPDOWN: "dropdown",
    CHECKBOX_GRID: "checkbox_grid",
    LINEAR_SCALE: "linear_scale",
    FILE_UPLOAD: "file_upload",
    RATING: "rating",
    MULTIPLE_CHOICE_GRID: "multiple_choice_grid",
};

export const QuestionTypeList = [
    QuestionType.TEXT,
    QuestionType.PARAGRAPH,
    QuestionType.MULTIPLE_CHOICE,
    QuestionType.CHECKBOXES,
    QuestionType.DROPDOWN,
    QuestionType.FILE_UPLOAD,
    QuestionType.LINEAR_SCALE,
    QuestionType.CHECKBOX_GRID,
    QuestionType.DATE,
    QuestionType.TIME,
];


export const questionTypeLabel = {
    [QuestionType.TEXT]: "Short Answer",
    [QuestionType.PARAGRAPH]: "Paragraph",
    [QuestionType.MULTIPLE_CHOICE]: "Multiple Choice",
    [QuestionType.CHECKBOXES]: "Checkboxes",
    [QuestionType.DROPDOWN]: "Dropdown",
    [QuestionType.FILE_UPLOAD]: "File Upload",
    [QuestionType.LINEAR_SCALE]: "Linear Scale",
    [QuestionType.CHECKBOX_GRID]: "Checkbox grid",
    [QuestionType.DATE]: "Date",
    [QuestionType.TIME]: "Time",
    [QuestionType.RATING]: "Rating",
    [QuestionType.MULTIPLE_CHOICE_GRID]: "Multiple Choice grid",
};

export const questionTypeWiseIcon = {
    [QuestionType.TEXT]: <MdOutlineShortText className="text-gray-500"/>,
    [QuestionType.PARAGRAPH]: <GrTextAlignFull className="text-gray-500"/>,
    [QuestionType.MULTIPLE_CHOICE]: <MdRadioButtonChecked className="text-gray-500"/>,
    [QuestionType.CHECKBOXES]: <FaRegCheckSquare className="text-gray-500"/>,
    [QuestionType.DROPDOWN]: <IoIosArrowDropdown className="text-gray-500"/>,
    [QuestionType.FILE_UPLOAD]: <AiOutlineCloudUpload className="text-gray-500"/>,
    [QuestionType.LINEAR_SCALE]: <MdOutlineLinearScale className="text-gray-500"/>,
    [QuestionType.CHECKBOX_GRID]: <TfiLayoutGrid3Alt className="text-gray-500"/>,
    [QuestionType.DATE]: <IoMdCalendar className="text-gray-500"/>,
    [QuestionType.TIME]: <IoMdTime className="text-gray-500"/>,
    [QuestionType.RATING]: <FaRegStar className="text-gray-500"/>,
    [QuestionType.MULTIPLE_CHOICE_GRID]: <CgMenuGridO className="text-gray-500"/>,
};