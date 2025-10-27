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
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto my-8">
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Form' : 'Create a New Form'}</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Form Title"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Form Description"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={handleSave}
                    className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700"
                >
                    {isEditMode ? 'Save' : 'Create Form'}
                </button>
            </div>
        </div>
    );
};

export default FormHeader;