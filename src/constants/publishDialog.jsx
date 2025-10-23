import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {MdPersonAddAlt} from "react-icons/md";
import {AiOutlineBell} from "react-icons/ai";
import {useState} from "react";
import {API_BASE_URL} from "@/constants/constants";

const PublishDialog = ({ formId, responseLink }) => {
    const [link, setLink] = useState(responseLink || '');
    const [isPublishing, setIsPublishing] = useState(false);

    const handlePublish = async (e) => {
        e.preventDefault();
        setIsPublishing(true);
        try {
            const response = await fetch(`${API_BASE_URL}/form/${formId}/publish/`,
                {
                    method: 'POST',
                });
            if (response.ok) {
                const data = await response.json();
                console.log("Publish data ",data);
                setLink(data.link);
            } else {
                console.error('Failed to publish form');
            }
        } catch (error) {
            console.error('Error publishing form:', error);
        } finally {
            setIsPublishing(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(link);
    };

    if (link) {
        return (
            <DialogContent className="sm:max-w-md bg-white top-0 sm:top-10 translate-y-0 sm:translate-y-0">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="text-lg font-medium">{responseLink ? 'Responder Link' : 'Your form is published!'}</DialogTitle>
                </DialogHeader>
                <div className="p-6 pt-0 space-y-4">
                    <p className="text-sm text-gray-500">Anyone with the link can now respond.</p>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            readOnly
                            value={link}
                            className="flex-grow p-2 border rounded-md bg-gray-50"
                        />
                        <button onClick={handleCopy} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Copy</button>
                    </div>
                </div>
                 <DialogFooter className="p-6 pt-0">
                    <DialogClose asChild>
                        <button className="bg-gray-100 hover:bg-gray-200 rounded-md font-semibold text-xs text-gray-600 px-4 py-2">Done</button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        );
    }

    return (
        <DialogContent className="sm:max-w-md bg-white top-0 sm:top-10 translate-y-0 sm:translate-y-0">
            <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-lg font-normal">Publish form</DialogTitle>
            </DialogHeader>
            <hr className="border-gray-200"/>
            <form onSubmit={handlePublish}>
                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <MdPersonAddAlt size={24} className="text-gray-500"/>
                            <div>
                                <h1 className="text-sm font-medium">Responders</h1>
                                <p className="text-xs text-gray-500">Anyone with the link</p>
                            </div>
                        </div>
                        <button type="button" className="bg-white hover:bg-gray-100 rounded-md font-semibold text-xs text-blue-500 px-3 py-1 border border-gray-300">Manage</button>
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
                <hr className="border-gray-200 py-2"/>
                <DialogFooter className="p-6 pt-0">
                    <DialogClose asChild>
                        <button type="button" className="bg-gray-100 hover:bg-gray-200 rounded-md font-semibold text-xs text-gray-600 px-4 py-2">Dismiss</button>
                    </DialogClose>
                    <button type="submit" disabled={isPublishing} className="bg-violet-800 hover:bg-violet-600 rounded-md font-semibold px-6 py-2 text-xs text-white disabled:bg-violet-400">
                        {isPublishing ? 'Publishing...' : 'Publish'}
                    </button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}

export default PublishDialog;