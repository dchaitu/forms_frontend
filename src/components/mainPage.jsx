import HeaderIcons from "../constants/headerIcons";
import {BsThreeDotsVertical} from "react-icons/bs";
import FormHeader from "@/components/formHeader";
import FormQuestion from "@/components/formQuestion";
import {useState, useRef, useEffect} from "react";
import AddElementsTray from "@/components/addElementsTray";
import IconHover from "@/constants/iconHover";
import FormTitleAndDescription from "@/components/formTitleAndDescription";

const MainPage = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [trayStyle, setTrayStyle] = useState({});

    const formHeaderRef = useRef(null);
    const formQuestionRef = useRef(null);
    const formTitleAndDescriptionRef = useRef(null);
    const formColumnRef = useRef(null);

    useEffect(() => {
        let selectedRef;
        if (selectedComponent === 'header') {
            selectedRef = formHeaderRef;
        } else if (selectedComponent === 'question') {
            selectedRef = formQuestionRef;
        } else if (selectedComponent === 'titleAndDescription') {
            selectedRef = formTitleAndDescriptionRef;
        }

        if (selectedRef && selectedRef.current && formColumnRef.current && formTitleAndDescriptionRef.current) {
            const selectedRect = selectedRef.current.getBoundingClientRect();
            const formColumnRect = formColumnRef.current.getBoundingClientRect();
            const formTitleAndDescriptionRect = formTitleAndDescriptionRef.current.getBoundingClientRect();

            setTrayStyle({
                position: 'absolute',
                top: selectedRect.top - formColumnRect.top,
                left: formColumnRect.width + 20, // 20px to the right
            });
        }
    }, [selectedComponent]);

    const isEditQuestion = () => (selectedComponent === 'question');
    const isEditTitleAndDescription = () => (selectedComponent === 'titleAndDescription');

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
                        <button className="bg-violet-800 hover:bg-violet-600 rounded-lg px-4 py-2 mx-2 text-white">Publish</button>

                        <IconHover icon={<BsThreeDotsVertical size={20}/>} text="More"/>
                    </div>
                </div>

            </div>
            <div id="form" className="bg-violet-100 h-screen px-10 ">
                <div className="flex flex-row justify-center">
                    <div className="relative">
                        <div className="flex flex-col" ref={formColumnRef}>
                            <div ref={formHeaderRef} onClick={() => setSelectedComponent('header')}>
                                <FormHeader/>
                            </div>
                            <div ref={formQuestionRef} onClick={() => setSelectedComponent('question')}>
                                <FormQuestion editQuestion={isEditQuestion()}/>
                            </div>
                            <div ref={formTitleAndDescriptionRef} onClick={() => setSelectedComponent('titleAndDescription')}>
                                <FormTitleAndDescription editTitleAndDescription={isEditTitleAndDescription()}/>
                            </div>
                        </div>

                    </div>
                    {selectedComponent &&
                        <div style={trayStyle}>
                            <AddElementsTray/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MainPage;