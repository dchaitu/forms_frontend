import MultipleChoiceOptions from "./questionTypes/multipleChoiceOptions";
import CheckboxOptions from "./questionTypes/checkboxOptions";
import DropdownOptions from "./questionTypes/dropDownOptions";
import TextOption from "./questionTypes/TextOption";
import ParagraphOption from "./questionTypes/ParagraphOption";
import { QuestionType } from "@/constants/questionType";
import LinearScaleOptions from "./questionTypes/LinearScaleOptions";

const QuestionOptions = ({ selectedQuestionType, editQuestion, options, setOptions, handleOptionChange, addOption, removeOption, handleOptionImageUpload, selectedStartValue, setSelectedStartValue, selectedEndValue, setSelectedEndValue }) => {
    switch (selectedQuestionType) {
        case QuestionType.MULTIPLE_CHOICE:
            return <MultipleChoiceOptions edit={editQuestion} options={options} handleOptionChange={handleOptionChange} addOption={addOption} removeOption={removeOption} handleOptionImageUpload={handleOptionImageUpload} />;
        case QuestionType.CHECKBOXES:
            return <CheckboxOptions edit={editQuestion} options={options} handleOptionChange={handleOptionChange} addOption={addOption} removeOption={removeOption} handleOptionImageUpload={handleOptionImageUpload} />;
        case QuestionType.DROPDOWN:
            return <DropdownOptions edit={editQuestion} options={options} handleOptionChange={handleOptionChange} addOption={addOption} removeOption={removeOption} handleOptionImageUpload={handleOptionImageUpload} />;
        case QuestionType.TEXT:
            return <TextOption />;
        case QuestionType.PARAGRAPH:
            return <ParagraphOption />;
        case QuestionType.LINEAR_SCALE:
            return <LinearScaleOptions selectedStartValue={selectedStartValue} setSelectedStartValue={setSelectedStartValue} selectedEndValue={selectedEndValue} setSelectedEndValue={setSelectedEndValue} />;
        default:
            return null;
    }
};

export default QuestionOptions;
