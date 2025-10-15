import HeaderIcons from "../constants/headerIcons";
import {BsThreeDotsVertical} from "react-icons/bs";
import FormHeader from "@/components/formHeader";
import FormQuestion from "@/components/formQuestion";
import {useState} from "react";
import AddElementsTray from "@/components/addElementsTray";

const MainPage = () => {
    const [showEditTray, setShowEditTray] = useState(false)
    const showEditOptions = () => setShowEditTray(!showEditTray)

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
                        <button className="bg-violet-900 rounded px-4 py-2 mx-2 text-white">Publish</button>
                        <BsThreeDotsVertical size={20}/>
                    </div>
                </div>

            </div>
            <div id="form" className="bg-violet-100 h-screen px-10 ">
                <div className="flex flex-row">
                    <div className="flex flex-col" onClick={showEditOptions}>
                        <FormHeader/>
                        <FormQuestion/>
                    </div>
                    <div>
                        {showEditTray && <AddElementsTray/>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;