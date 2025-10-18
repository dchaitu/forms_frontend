import IconHover from "@/constants/iconHover";
import {BiCollapseVertical} from "react-icons/bi";
import {BsThreeDotsVertical} from "react-icons/bs";


const FormHeader = (props) => {
    const headerName = "Untitled Form"
    const headerDescription = "Form Description"
    const {isSelected} = props;
    return (

        <div className="border-gray-700 min-w-[80vw]" >
        <div className="flex flex-row p-5 bg-white rounded my-2 focus:outline-none border-t-8 border-t-[rgb(103,58,183)] border-l-4 focus:border-l-[#4285f4] border-r-0 border-b-0" tabIndex="0">
            <div className="flex flex-col">
                <input placeholder="Untitled Form" value={headerName} className=" rounded py-1 text-3xl"/>
                <input placeholder={headerDescription}/>
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