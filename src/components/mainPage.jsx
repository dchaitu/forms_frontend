import HeaderIcons from "../constants/headerIcons";
import {BsThreeDotsVertical} from "react-icons/bs";
import FormHeader from "@/components/formHeader";
import FormQuestion from "@/components/formQuestion";
import {useState, useRef, useEffect} from "react";
import AddElementsTray from "@/components/addElementsTray";
import IconHover from "@/constants/iconHover";
import FormTitleAndDescription from "@/components/formTitleAndDescription";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {MdContentCopy, MdFormatAlignJustify} from "react-icons/md";
import {IoExtensionPuzzleOutline, IoPrintSharp} from "react-icons/io5";
import {FaRegKeyboard, FaRegTrashAlt} from "react-icons/fa";
import {ImEmbed} from "react-icons/im";
import FormActionsDropdown from "@/constants/formActionsDropdown";

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
            <div id="header" className="bg-white">
                <div className="flex flex-1 justify-between items-center">
                    <div className="flex flex-row w-10 p-2 m-2">
                        <img src="/images/forms_logo.png" alt="forms_logo"/>
                        <div className="self-center mx-2">
                            <h1>Forms</h1>
                        </div>
                    </div>

                    <div className="flex justify-end items-center">
                        <HeaderIcons/>
                        <button className="bg-violet-800 hover:bg-violet-600 rounded-md font-semibold px-6 py-2 mx-2 text-xs text-white">Publish</button>

                        <FormActionsDropdown />
                    </div>
                </div>

            </div>
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