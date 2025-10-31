import { MdClose, MdOutlineImage } from "react-icons/md";
import IconHover from "@/constants/iconHover";
import { useRef } from "react";

const MultipleChoiceOptions = ({ edit, options, handleOptionChange, addOption, removeOption, handleOptionImageUpload }) => {
    const imageInputRef = useRef(null);

    return (
        <div>
            {options.map((opt, index) => (
                <div key={index} className="flex items-center my-2">
                    <input type="radio" disabled className="h-4 w-4 text-gray-400" />
                    {opt.image_url && <img src={opt.image_url} alt="option" className="w-10 h-10 ml-2"/>}
                    {edit ? (
                        <input
                            type="text"
                            value={opt.text}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="ml-3 p-1 border-b-2 border-transparent focus:border-blue-500 focus:outline-none"
                        />
                    ) : (
                        <span className="ml-3">{opt.text}</span>
                    )}
                    {edit && (
                        <>
                            <input
                                type="file"
                                ref={imageInputRef}
                                onChange={(e) => handleOptionImageUpload(e, opt.id)}
                                className="hidden"
                            />
                            <IconHover icon={<MdOutlineImage size={20} className="text-gray-500"/>} text="Add Image" onClick={() => imageInputRef.current.click()}/>
                            <button onClick={() => removeOption(index)} className="ml-2 text-gray-500 hover:text-gray-700">
                                <MdClose />
                            </button>
                        </>
                    )}
                </div>
            ))}
            {edit && (
                <button onClick={addOption} className="text-blue-600 hover:text-blue-800 ml-7">
                    Add option
                </button>
            )}
        </div>
    );
};

export default MultipleChoiceOptions;
