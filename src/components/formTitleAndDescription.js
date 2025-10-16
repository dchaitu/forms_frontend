import IconHover from "@/constants/iconHover";
import {MdContentCopy} from "react-icons/md";
import {FaRegTrashAlt} from "react-icons/fa";
import {BsThreeDotsVertical} from "react-icons/bs";

const FormTitleAndDescription = (props) => {
    const {editTitleAndDescription} = props;
    const title = "Title";
    const description = "Description"
    return (
        <div
            className="flex p-5 bg-white shadow rounded-lg my-2 focus:outline-none border-l-4 focus:border-l-[#4285f4] border-r-0 border-b-0"
            tabIndex="0">
            <div className="w-full flex flex-row justify-between items-start mb-2">
                <div className="flex flex-col items-start">
                    <div className="w-full">
                        <input
                            value={title}
                            className="w-full text-lg font-medium mb-2 p-1 border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="w-full">
                        <input
                            value={description}
                            className="w-full text-sm mb-2 p-1 border-b border-transparent hover:border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                {editTitleAndDescription && (
                    <div className="flex  flex-col  items-end">

                        <div className="flex flex-row">
                            <div>
                                <IconHover icon={<MdContentCopy className="text-gray-500" size={20}/>} text="Duplicate Question"/>
                            </div>
                            <div>
                                <IconHover icon={<FaRegTrashAlt className="text-gray-500" size={20}/>} text="Delete Question"/>
                            </div>
                            <IconHover icon={<BsThreeDotsVertical size={20} className="text-gray-500"/>} text="More Options"/>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default FormTitleAndDescription;