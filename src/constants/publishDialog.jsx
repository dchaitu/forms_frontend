import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {MdPersonAddAlt} from "react-icons/md";
import {AiOutlineBell} from "react-icons/ai";
import {API_BASE_URL} from "@/constants/constants";

const PublishDialog = (props) => {
    const {formId} = props

    const handlePublish = async () => {
        try {
            const resp = await fetch(`${API_BASE_URL}/form/${formId}/publish/`, {
                method: "POST",
            });
            const data = await resp.json();
            console.log("publish data ",data)
            alert(`Your form is live! Share this link:\n${data.response_link}`);
        }
        catch (error) {
            console.error("Error publishing form:", error);
        }

    };

    return (
        <DialogContent className="sm:max-w-md bg-white top-0 sm:top-10 translate-y-0 sm:translate-y-0">
            <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-lg font-normal">Publish form</DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <MdPersonAddAlt size={24} className="text-gray-500"/>
                        <div>
                            <h1 className="text-sm font-medium">Responders</h1>
                            <p className="text-xs text-gray-500">Anyone with the link</p>
                        </div>
                    </div>
                    <button className="bg-white hover:bg-gray-100 rounded-md font-semibold text-xs text-blue-500 px-3 py-1 border border-gray-300">Manage</button>
                </div>

                <hr className="border-gray-200"/>

                <div className="flex items-start space-x-4">
                    <AiOutlineBell size={24} className="text-gray-500 mt-1"/>
                    <div>
                        <h1 className="text-sm font-medium">Notifications</h1>
                        <p className="text-xs text-gray-500">Nobody will be notified when publishing the form</p>
                    </div>
                </div>
            </div>

            <DialogFooter className="p-6 pt-0">
                <DialogClose asChild>
                    <button className="bg-gray-100 hover:bg-gray-200 rounded-md font-semibold text-xs text-gray-600 px-4 py-2">Dismiss</button>
                </DialogClose>
                <button type="submit" onClick={handlePublish} className="bg-violet-800 hover:bg-violet-600 rounded-md font-semibold px-6 py-2 text-xs text-white">Publish</button>
            </DialogFooter>
        </DialogContent>
    )
}

export default PublishDialog;