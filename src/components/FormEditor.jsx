import FormSection from "@/components/formSection";
import FormQuestion from "@/components/formQuestion";
import {useState, useRef, useEffect} from "react";
import AddElementsTray from "@/components/addElementsTray";
import FormTitleAndDescription from "@/components/formTitleAndDescription";
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

    // const addTitleAndDescription = async (updatedData) => {
    //     try {
    //         const resp = await fetch(`${API_BASE_URL}/form/${formId}/`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(updatedData),
    //         });
    //         const data = await resp.json();
    //         console.log("Updated form:", data);
    //
    //         if (resp.ok) {
    //             setFormData(prevData => ({
    //                 ...prevData,
    //                 title: data.title,
    //                 description: data.description,
    //             }));
    //         } else {
    //             console.error("Failed to save form title and description");
    //         }
    //     } catch (error) {
    //         console.error("Error saving form title and description:", error);
    //     }
    // };

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

    const addQuestion = () => {
        if (!selectedComponent) return;

        const newQuestion = {
            id: Date.now(),
            text: "New Question",
            question_type: QuestionType.TEXT,
            options: [],
        };

        setFormData(prevData => {
            let newSections;

            if (selectedComponent.startsWith('question_')) {
                const questionId = parseInt(selectedComponent.split('_')[1]);
                let questionAdded = false;
                newSections = prevData.sections.map(section => {
                    if (questionAdded) return section;
                    const questionIndex = section.questions.findIndex(q => q.id === questionId);
                    if (questionIndex !== -1) {
                        questionAdded = true;
                        const newQuestions = [...section.questions];
                        newQuestions.splice(questionIndex + 1, 0, newQuestion);
                        return { ...section, questions: newQuestions };
                    }
                    return section;
                });
            } else if (selectedComponent.startsWith('section_')) {
                const sectionId = parseInt(selectedComponent.split('_')[1]);
                newSections = prevData.sections.map(section => {
                    if (section.id === sectionId) {
                        return { ...section, questions: [...section.questions, newQuestion] };
                    }
                    return section;
                });
            } else if (selectedComponent === 'header') {
                if (prevData.sections.length > 0) {
                    newSections = prevData.sections.map((section, index) => {
                        if (index === 0) {
                            return { ...section, questions: [...section.questions, newQuestion] };
                        }
                        return section;
                    });
                } else {
                    newSections = prevData.sections;
                }
            } else {
                newSections = prevData.sections;
            }

            return {
                ...prevData,
                sections: newSections,
            };
        });
    };

    const addSection = () => {
        const newSection = {
            id: Date.now(),
            title: "New Section",
            description: "",
            questions: []
        };

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
                       <FormTitleAndDescription
                            editTitleAndDescription={selectedComponent === 'header'}
                            title={formData.title}
                            description={formData.description}
                            // addTitleAndDescription={addTitleAndDescription}
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
                                    title={section.title}
                                    description={section.description}
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