import FormSection from "@/components/formSection";
import FormQuestion from "@/components/formQuestion";
import {useState, useRef, useEffect} from "react";
import AddElementsTray from "@/components/addElementsTray";
import FormTitleAndDescription from "@/components/formTitleAndDescription";
import Header from "@/constants/header";
import {API_BASE_URL} from "@/constants/constants";
import {Spinner} from "@/components/ui/spinner";

const MainPage = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [trayStyle, setTrayStyle] = useState({});
    const formColumnRef = useRef(null);
    const componentRefs = useRef(new Map());

    const [formData, setFormData] = useState(null);
    const [formId, setFormId] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(`${API_BASE_URL}/form/${formId}/complete/`);
            const data = await resp.json();
            console.log("formData",data);
            setFormData(data);
        }
        fetchData();
    }, [formId]);

    const deleteQuestion = async (questionId) => {
        try {
            const resp = await fetch(`${API_BASE_URL}/question/${questionId}/`, {
                method: 'DELETE',
            });
            const data = await resp.json();
            console.log(data);

            if (resp.ok) {
                setFormData(prevData => {
                    const newData = { ...prevData };
                    for (const section of newData.sections) {
                        const questionIndex = section.questions.findIndex(q => q.id === questionId);
                        if (questionIndex !== -1) {
                            section.questions.splice(questionIndex, 1);
                            break;
                        }
                    }
                    return newData;
                });
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
            console.log("Updated question:", data);
            console.log("updated Data ",updatedData)


            if (resp.ok) {
                setFormData(prevData => {
                    const newData = { ...prevData };
                    for (const section of newData.sections) {
                        const questionIndex = section.questions.findIndex(q => q.id === questionId);
                        if (questionIndex !== -1) {
                            section.questions[questionIndex] = data;
                            break;
                        }
                    }
                    return newData;
                });
            } else {
                console.error("Failed to save question");
            }
        } catch (error) {
            console.error("Error saving question:", error);
        }
    };

    const addQuestion = () => console.log("Add Question clicked");
    const addTitleAndDescription = () => console.log("Add Title and Description clicked");
    const addSection = () => console.log("Add Section clicked");
    const addImage = () => console.log("Add Image clicked");
    const addVideo = () => console.log("Add Video clicked");
    const addImportQuestions = () => console.log("Add Import Questions clicked");

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

    if (!formData) {
        return <div><Spinner className="size-4 animate-spin"/></div>; // Or some other loading state
    }

    return (
        <div id="mainPage">
            <Header formId={formId} responseLink={formData?.response_link}/>
            <div id="form" className="bg-violet-100 min-h-screen px-10 ">
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
                                <AddElementsTray addQuestion={addQuestion}
                                                 addTitleAndDescription={addTitleAndDescription}
                                                 addSection={addSection}
                                                 addImage={addImage}
                                                 addVideo={addVideo}
                                                 addImportQuestions={addImportQuestions}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;