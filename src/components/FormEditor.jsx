import FormSection from "@/components/formSection";
import FormQuestion from "@/components/formQuestion";
import {useState, useRef, useEffect} from "react";
import AddElementsTray from "@/components/addElementsTray";
import FormHeader from "@/components/FormHeader";
import {API_BASE_URL} from "@/constants/constants";
import { QuestionType } from "@/constants/questionType";

const FormEditor = ({initialFormData, formId}) => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [trayStyle, setTrayStyle] = useState({});
    const formColumnRef = useRef(null);
    const componentRefs = useRef(new Map());

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        setFormData(initialFormData);
    }, [initialFormData]);

    const handleSaveFormInfo = (updatedData) => {
        setFormData(prevData => ({
            ...prevData,
            title: updatedData.title,
            description: updatedData.description,
        }));
    };

    const deleteQuestion = async (questionId) => {
        try {
            const resp = await fetch(`${API_BASE_URL}/question/${questionId}/`, {
                method: 'DELETE',
            });
            if (resp.ok) {
                setFormData(prevData => ({
                    ...prevData,
                    sections: prevData.sections.map(section => ({
                        ...section,
                        questions: section.questions.filter(q => q.id !== questionId),
                    })),
                }));
            } else {
                console.error("Failed to delete question");
            }
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    const saveQuestion = async (questionId, updatedData) => {
        try {
            const resp = await fetch(`${API_BASE_URL}/question/${questionId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            const data = await resp.json();
            if (resp.ok) {
                setFormData(prevData => ({
                    ...prevData,
                    sections: prevData.sections.map(section => ({
                        ...section,
                        questions: section.questions.map(q => q.id === questionId ? data : q),
                    })),
                }));
            } else {
                console.error("Failed to save question");
            }
        } catch (error) {
            console.error("Error saving question:", error);
        }
    };

    const addQuestion = async () => {
        if (!selectedComponent) return;

        const sectionId = selectedComponent.startsWith('section_')
            ? parseInt(selectedComponent.split('_')[1])
            : selectedComponent.startsWith('question_')
                ? formData.sections.find(s => s.questions.some(q => q.id === parseInt(selectedComponent.split('_')[1]))).id
                : formData.sections[0].id;

        const questionInfo = {
            question_type: QuestionType.TEXT,
            options: [],
            section_id: sectionId,
            title: "New Question",
            description: "New Question Description",
            is_required: false,
        }
        console.log("questionInfo ",questionInfo);
        const resp = await fetch(`${API_BASE_URL}/question/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionInfo),
        });
        const data = await resp.json();

        setFormData(prevData => {
            const newSections = prevData.sections.map(section => {
                if (section.id === sectionId) {
                    const newQuestions = [...section.questions, data];
                    return { ...section, questions: newQuestions };
                }
                return section;
            });

            return {
                ...prevData,
                sections: newSections,
            };
        });
    };

    const addSection = async () => {
        try {
            const resp = await fetch(`${API_BASE_URL}/section/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: "New Section", description: "", form_id: formId, questions: [] }),
            });
            const newSection = await resp.json();
            if (resp.ok) {
                setFormData(prevData => {
                    let currentSectionIndex = -1;

                    if (selectedComponent && selectedComponent.startsWith('question_')) {
                        const questionId = parseInt(selectedComponent.split('_')[1]);
                        currentSectionIndex = prevData.sections.findIndex(s => s.questions.some(q => q.id === questionId));
                    } else if (selectedComponent && selectedComponent.startsWith('section_')) {
                        const sectionId = parseInt(selectedComponent.split('_')[1]);
                        currentSectionIndex = prevData.sections.findIndex(s => s.id === sectionId);
                    }

                    const newSections = [...prevData.sections];
                    if (currentSectionIndex !== -1) {
                        newSections.splice(currentSectionIndex + 1, 0, newSection);
                    } else {
                        newSections.push(newSection);
                    }

                    return {
                        ...prevData,
                        sections: newSections,
                    };
                });
            } else {
                console.error("Failed to add section");
            }
        } catch (error) {
            console.error("Error adding section:", error);
        }
    };


    useEffect(() => {
        const selectedRef = componentRefs.current.get(selectedComponent);

        if (selectedRef && formColumnRef.current) {
            const selectedRect = selectedRef.getBoundingClientRect();
            const formColumnRect = formColumnRef.current.getBoundingClientRect();

            setTrayStyle({
                position: 'absolute',
                top: selectedRect.top - formColumnRect.top,
                left: formColumnRect.width + 20, // 20px to the right
            });
        }
    }, [selectedComponent]);

    return (
        <div className="flex flex-row justify-center">
            <div className="relative">
                <div className="flex flex-col" ref={formColumnRef}>
                    <div
                        ref={el => componentRefs.current.set('header', el)}
                        onClick={() => setSelectedComponent('header')}
                    >
                       <FormHeader
                            formId={formId}
                            initialTitle={formData.title}
                            initialDescription={formData.description}
                            onSave={handleSaveFormInfo}
                        />
                    </div>
                    {formData.sections.map((section) => (
                        <div key={section.id}>
                            <div
                                className="my-2"
                                ref={el => componentRefs.current.set(`section_${section.id}`, el)}
                                onClick={() => setSelectedComponent(`section_${section.id}`)}
                            >
                                <FormSection
                                    sectionId={section.id}
                                    title={section.title}
                                    description={section.description}
                                    formId={formId}
                                    isSelected={selectedComponent === `section_${section.id}`}
                                />
                            </div>
                            {section.questions.map(question => (
                                <div
                                    className="my-2"
                                    key={question.id}
                                    ref={el => componentRefs.current.set(`question_${question.id}`, el)}
                                    onClick={() => setSelectedComponent(`question_${question.id}`)}
                                >
                                    <FormQuestion
                                        sectionId={section.id}
                                        questionData={question}
                                        editQuestion={selectedComponent === `question_${question.id}`}
                                        deleteQuestion={deleteQuestion}
                                        saveQuestion={saveQuestion}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {selectedComponent &&
                    <div style={trayStyle}>
                        <AddElementsTray addQuestion={addQuestion} addSection={addSection}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default FormEditor;