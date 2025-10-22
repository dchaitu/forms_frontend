import HeaderIcons from "../constants/headerIcons";
import FormHeader from "@/components/formHeader";
import FormQuestion from "@/components/formQuestion";
import {useState, useRef, useEffect} from "react";
import AddElementsTray from "@/components/addElementsTray";
import FormTitleAndDescription from "@/components/formTitleAndDescription";
import FormActionsDropdown from "@/constants/formActionsDropdown";
import Header from "@/constants/header";

const MainPage = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [trayStyle, setTrayStyle] = useState({});
    const [questions, setQuestions] = useState([{id: 'initial_question'}]);

    const formColumnRef = useRef(null);
    const componentRefs = useRef(new Map());

    const addQuestion = () => {
        const newId = `question_${Date.now()}`;
        setQuestions(prev => [...prev, {id: newId}]);
        setSelectedComponent(newId); // Select the new question
    };

    const addTitleAndDescription = () => {
        setSelectedComponent('titleAndDescription');
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
        <div id="mainPage">
            <Header/>
            <div id="form" className="bg-violet-100 h-screen px-10 ">
                <div className="flex flex-row justify-center">
                    <div className="relative">
                        <div className="flex flex-col" ref={formColumnRef}>
                            <div
                                ref={el => componentRefs.current.set('header', el)}
                                onClick={() => setSelectedComponent('header')}
                            >
                                <FormHeader isSelected={selectedComponent==='header'}/>
                            </div>
                            {questions.map(q => (
                                <div
                                    className="my-2"
                                    key={q.id}
                                    ref={el => componentRefs.current.set(q.id, el)}
                                    onClick={() => setSelectedComponent(q.id)}
                                >
                                    <FormQuestion editQuestion={selectedComponent === q.id}/>
                                </div>
                            ))}
                            <div
                                ref={el => componentRefs.current.set('titleAndDescription', el)}
                                onClick={() => setSelectedComponent('titleAndDescription')}
                            >
                                <FormTitleAndDescription editTitleAndDescription={selectedComponent === 'titleAndDescription'}/>
                            </div>
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