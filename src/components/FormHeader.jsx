import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/constants/constants';

const FormHeader = ({ onSave, formId, initialTitle = '', initialDescription = '' }) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);

    useEffect(() => {
        setTitle(initialTitle);
        setDescription(initialDescription);
    }, [initialTitle, initialDescription]);

    const isEditMode = !!formId;

    const handleSave = async () => {
        const payload = { title, description };
        const url = isEditMode ? `${API_BASE_URL}/form/${formId}/` : `${API_BASE_URL}/form/`;
        const method = isEditMode ? 'PUT' : 'POST';
        console.log("Current form id is ", formId)
        console.log("isEditMode ", isEditMode)
        if (!isEditMode) {
            payload.sections = [];
        }

        try {
            const resp = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const savedData = await resp.json();
            if (resp.ok) {
                if (onSave) {
                    onSave(savedData);
                }
            } else {
                console.error(`Failed to ${isEditMode ? 'save' : 'create'} form`, savedData);
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? 'saving' : 'creating'} form:`, error);
        }
    };

    return (
        <div className="border-gray-700 min-w-[80vw]" >
            <div className="flex flex-row p-5 bg-white rounded my-2 focus:outline-none border-t-8 border-t-[rgb(103,58,183)] border-l-4 focus:border-l-[#4285f4] border-r-0 border-b-0" tabIndex="0">
                <div className="flex flex-col w-full">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Form Title"
                        className="rounded py-1 text-3xl w-full"
                    />
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Form Description"
                        className="w-full"
                    />
                </div>
                <div className="flex items-start ml-auto">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                        {isEditMode ? 'Save' : 'Create Form'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormHeader;