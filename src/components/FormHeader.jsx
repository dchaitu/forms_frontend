import { useState } from 'react';
import { API_BASE_URL } from '@/constants/constants';

const FormHeader = ({ onFormCreate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateForm = async () => {
        try {
            const resp = await fetch(`${API_BASE_URL}/form/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, sections:[] }),
            });
            const newForm = await resp.json();
            if (resp.ok) {
                if (onFormCreate) {
                    onFormCreate(newForm);
                }
            } else {
                console.error("Failed to create form", newForm);
            }
        } catch (error) {
            console.error("Error creating form:", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto my-8">
            <h2 className="text-2xl font-bold mb-4">Create a New Form</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Form Title"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Form Description"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows="3"
                />
                <button
                    onClick={handleCreateForm}
                    className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700"
                >
                    Create Form
                </button>
            </div>
        </div>
    );
};

export default FormHeader;