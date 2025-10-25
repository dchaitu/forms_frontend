import { QuestionType } from "@/constants/questionType";

const FormQuestionAnswer = (props) => {
    const { questionData, onAnswerChange, response } = props;

    const renderAnswerOptions = () => {
        switch (questionData.question_type) {
            case QuestionType.MULTIPLE_CHOICE:
                return questionData.options.map(option => (
                    <div key={option.id} className="flex items-center my-2">
                        <input
                            type="radio"
                            id={`option-${option.id}`}
                            name={`question-${questionData.id}`}
                            value={option.id}
                            checked={response === option.id}
                            onChange={(e) => onAnswerChange(parseInt(e.target.value))}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor={`option-${option.id}`} className="ml-3 block text-sm font-medium text-gray-700">
                            {option.text}
                        </label>
                    </div>
                ));
            case QuestionType.CHECKBOXES:
                return questionData.options.map(option => (
                    <div key={option.id} className="flex items-center my-2">
                        <input
                            type="checkbox"
                            id={`option-${option.id}`}
                            value={option.id}
                            checked={response?.includes(option.id) || false}
                            onChange={(e) => {
                                const newResponse = response ? [...response] : [];
                                if (e.target.checked) {
                                    newResponse.push(option.id);
                                } else {
                                    const index = newResponse.indexOf(option.id);
                                    if (index > -1) {
                                        newResponse.splice(index, 1);
                                    }
                                }
                                onAnswerChange(newResponse);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`option-${option.id}`} className="ml-3 block text-sm font-medium text-gray-700">
                            {option.text}
                        </label>
                    </div>
                ));
            case QuestionType.TEXT:
                return (
                    <input
                        type="text"
                        value={response || ''}
                        onChange={(e) => onAnswerChange(e.target.value)}
                        className="p-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                        placeholder="Your answer"
                        maxLength={25}
                    />
                );
            case QuestionType.PARAGRAPH:
                return (
                    <textarea
                        value={response || ''}
                        onChange={(e) => onAnswerChange(e.target.value)}
                        className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                        placeholder="Your answer"
                    />
                );
            case QuestionType.DROPDOWN:
                return (
                    <select
                        value={response || ''}
                        onChange={(e) => onAnswerChange(parseInt(e.target.value))}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="" disabled>Select an option</option>
                        {questionData.options.map(option => (
                            <option key={option.id} value={option.id}>{option.text}</option>
                        ))}
                    </select>
                );
            default:
                return <p className="text-red-500">This question type is not supported for answering yet.</p>;
        }
    };

    return (
        <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-white flex flex-col items-start">
            <h3 className="text-lg font-medium text-gray-900">{questionData.title}</h3>
            {questionData.description && <p className="text-sm text-gray-500 mt-1">{questionData.description}</p>}
            <div className="mt-4">
                {renderAnswerOptions()}
            </div>
        </div>
    );
};

export default FormQuestionAnswer;