import MultipleChoiceOptions from "./questionTypes/multipleChoiceOptions";
import CheckboxOptions from "./questionTypes/checkboxOptions";
import DropdownOptions from "./questionTypes/dropDownOptions";
import TextOption from "./questionTypes/TextOption";
import ParagraphOption from "./questionTypes/ParagraphOption";
import { QuestionType } from "@/constants/questionType";

const QuestionOptions = ({ selectedQuestionType, editQuestion, options, setOptions, handleOptionChange, addOption, removeOption }) => {
    switch (selectedQuestionType) {
        case QuestionType.MULTIPLE_CHOICE:
            return <MultipleChoiceOptions edit={editQuestion} options={options} handleOptionChange={handleOptionChange} addOption={addOption} removeOption={removeOption} />;
        case QuestionType.CHECKBOXES:
            return <CheckboxOptions edit={editQuestion} options={options} handleOptionChange={handleOptionChange} addOption={addOption} removeOption={removeOption} />;
        case QuestionType.DROPDOWN:
            return <DropdownOptions edit={editQuestion} options={options} handleOptionChange={handleOptionChange} addOption={addOption} removeOption={removeOption} />;
        case QuestionType.TEXT:
            return <TextOption />;
        case QuestionType.PARAGRAPH:
            return <ParagraphOption />;
        default:
            return null;
    }
};

export default QuestionOptions;
