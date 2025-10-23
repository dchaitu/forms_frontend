import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '@/constants/constants';
import FormQuestion from '@/components/formQuestion';

const AnswerPage = () => {
    const { unique_id } = useParams();
    const [formData, setFormData] = useState(null);
    const [responses, setResponses] = useState({});

    useEffect(() => {
        const fetchForm = async () => {
            try {
                // Assuming an endpoint to fetch form by unique_id
                const resp = await fetch(`${API_BASE_URL}/form/by_uuid/${unique_id}`);
                if (resp.ok) {
                    const data = await resp.json();
                    setFormData(data);
                } else {
                    console.error('Failed to fetch form');
                }
            } catch (error) {
                console.error('Error fetching form:', error);
            }
        };
        fetchForm();
    }, [unique_id]);

    const handleAnswerChange = (questionId, answer) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(`${API_BASE_URL}/form/submit/${unique_id}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ response_data: responses }),
                });
            if (resp.ok) {
                alert('Responses submitted successfully!');
            } else {
                console.error('Failed to submit responses');
            }
        } catch (error) {
            console.error('Error submitting responses:', error);
        }
    };

    if (!formData) {
        return <div>Loading form...</div>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">{formData.title}</h1>
                <p className="text-gray-600 mb-8">{formData.description}</p>
                <form onSubmit={handleSubmit}>
                    {formData.sections.map(section => (
                        <div key={section.id} className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                            <p className="text-gray-500 mb-6">{section.description}</p>
                            {section.questions.map(question => (
                                <div key={question.id} className="mb-6">
                                    <FormQuestion
                                        questionData={question}
                                        answerMode={true}
                                        onAnswerChange={(answer) => handleAnswerChange(question.id, answer)}
                                        response={responses[question.id]}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AnswerPage;
