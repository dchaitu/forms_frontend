const TextOption = () => {
    return (
        <div className="my-3 flex items-start gap-2">
            <input
                type="text"
                placeholder="Short answer text"
                className="w-1/2 p-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                disabled
            />
        </div>
    );
};

export default TextOption;
