const ParagraphOption = () => {
    return (
        <div className="my-5">
            <textarea
                placeholder="Long answer text"
                className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                disabled
            />
        </div>
    );
};

export default ParagraphOption;
