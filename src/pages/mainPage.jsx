import FormSection from "@/components/formSection";
import FormQuestion from "@/components/formQuestion";
import {useState, useRef, useEffect} from "react";
import AddElementsTray from "@/components/addElementsTray";
import FormTitleAndDescription from "@/components/formTitleAndDescription";
import Header from "@/constants/header";
import {API_BASE_URL} from "@/constants/constants";

const MainPage = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [trayStyle, setTrayStyle] = useState({});
    const formColumnRef = useRef(null);
    const componentRefs = useRef(new Map());

    const [formData, setFormData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(`${API_BASE_URL}/form/1/complete/`);
            const data = await resp.json();
            console.log(data);
            setFormData(data);
        }
        fetchData();
        console.log(formData);
    }, [formData]);

    // Not implementing add/edit functionality as per the request to focus on rendering.
    const addQuestion = () => console.log("Add Question clicked");
    const addTitleAndDescription = () => console.log("Add Title and Description clicked");


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
        return <div>Loading...</div>; // Or some other loading state
    }

    return (
        <div id="mainPage">
            <Header/>
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
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        {selectedComponent &&
                            <div style={trayStyle}>
                                <AddElementsTray addQuestion={addQuestion} addTitleAndDescription={addTitleAndDescription}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;