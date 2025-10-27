import {ChevronDownIcon} from "lucide-react";
import SettingOptions from "@/components/settingOptions";
import Header from "@/constants/header";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "@/constants/constants";
import {useParams} from "react-router-dom";

const SettingsPage = () => {
    const {formId} = useParams();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(`${API_BASE_URL}/form/${formId}/complete/`);
                const data = await resp.json();
                setFormData(data);
            } catch (error) {
                console.error("Error fetching form data:", error);
            }
        }
        fetchData();
    }, [formId]);

    return (
        <div id="settingsPage">
            <Header formId={formId} responseLink={formData?.response_link}/>

        <div className="bg-violet-100 h-screen place-content-center justify-items-center">
            <div className="bg-white rounded-lg m-4 w-3/4 border-4">
                <div className="flex flex-col items-start  space-y-4 p-8">
                    <h1 className="font-normal text-lg">Settings</h1>
                    <hr className="w-full my-2 border-gray-200"/>

                    <SettingOptions title="Make this a quiz"
                                    subtitle="Assign points, set answers, and automatically provide feedback"
                                    extendComponent={<ChevronDownIcon className="ml-1 h-4 w-4"/>}/>
                    <hr className="w-full my-2 border-gray-200"/>

                    <SettingOptions optionClass='' title="Responses"
                                    subtitle="Manage how responses are collected and protected"
                                    extendComponent={<ChevronDownIcon className="ml-1 h-4 w-4"/>}/>
                    <hr className="w-full my-2 border-gray-200"/>

                    <SettingOptions title="Presentation" subtitle="Manage how the form and responses are presented"
                                    extendComponent={<ChevronDownIcon className="ml-1 h-4 w-4"/>}/>
                </div>
            </div>
            <div className="bg-white rounded-lg m-4 w-3/4 border-4">
                <div className="flex flex-col items-start  space-y-4 p-8">
                    <h1 className="font-normal text-lg">Default</h1>
                    <hr className="w-full my-2 border-gray-200"/>
                    <SettingOptions title="Form defaults" subtitle="Settings applied to this form and new forms" extendComponent={<ChevronDownIcon className="ml-1 h-4 w-4"/>}/>
                    <hr className="w-full my-2 border-gray-200"/>
                    <SettingOptions title="Question defaults" subtitle="Settings applied to all new questions" extendComponent={<ChevronDownIcon className="ml-1 h-4 w-4"/>}/>

                </div>
            </div>
        </div>

        </div>
    )
}

export default SettingsPage;
