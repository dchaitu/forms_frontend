import { MdClose } from "react-icons/md";

const CheckboxOptions = ({ edit, options, handleOptionChange, addOption, removeOption }) => {


    return (
        <div>
            {options.map((opt, index) => (
                <div key={index} className="flex items-center my-2">
                    <input type="checkbox" disabled className="h-4 w-4 text-gray-400" />
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
                        <button onClick={() => removeOption(index)} className="ml-2 text-gray-500 hover:text-gray-700">
                            <MdClose />
                        </button>
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

export default CheckboxOptions;
