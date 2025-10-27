import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '@/constants/constants';
import FormQuestion from '@/components/formQuestion';

const AnswerPage = () => {
    const { unique_id } = useParams();
    const [formData, setFormData] = useState(null);
    const [responses, setResponses] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const resp = await fetch(`${API_BASE_URL}/form/by_uuid/${unique_id}`);
                if (resp.ok) {
                    const data = await resp.json();
                    console.log("Answer page form data ", data);
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
                    body: JSON.stringify(responses),
                });
            if (resp.ok) {
                setSubmissionStatus('success');
            } else {
                setSubmissionStatus('error');
                console.error('Failed to submit responses');
            }
        } catch (error) {
            console.error('Error submitting responses:', error);
        }
    };

    const handleNext = () => {
        if (currentPage < formData.sections.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (!formData) {
        return <div>Loading form...</div>;
    }

    const currentSection = formData.sections[currentPage];
    const isLastPage = currentPage === formData.sections.length - 1;

    if (submissionStatus === 'success') {
        return (
            <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
                    <p className="text-green-500 text-lg">Your response has been submitted successfully.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">{formData.title}</h1>
                <p className="text-gray-600 mb-8">{formData.description}</p>
                {submissionStatus === 'error' && <p className="text-red-500">Failed to submit responses. Please try again.</p>}
                <form onSubmit={handleSubmit}>
                    <div key={currentSection.id} className="flex flex-col mb-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">{currentSection.title}</h2>
                            <p className="text-gray-500 mb-6">{currentSection.description}</p>
                        </div>
                        {currentSection.questions.map(question => (
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
                    <div className="flex justify-between">
                        <div>
                            {currentPage > 0 && (
                                <button type="button" onClick={handlePrevious} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    Previous
                                </button>
                            )}
                        </div>
                        <div className="flex justify-end">

                            {!isLastPage && (
                                <button type="button" onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    Next
                                </button>
                            )}

                            {isLastPage && (
                                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    Submit
                                </button>
                            )}
                        </div>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default AnswerPage;
