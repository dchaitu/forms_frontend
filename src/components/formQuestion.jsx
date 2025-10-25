import FormQuestionEdit from './FormQuestionEdit';
import FormQuestionAnswer from './FormQuestionAnswer';

const FormQuestion = (props) => {
    if (props.answerMode) {
        return <FormQuestionAnswer {...props} />;
    }

    return <FormQuestionEdit {...props} />;
};

export default FormQuestion;