import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/constants/constants";
import { Spinner } from "@/components/ui/spinner";

const HomePage = () => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const resp = await fetch(`${API_BASE_URL}/form/all/`);
                const data = await resp.json();
                setForms(data);
            } catch (err) {
                console.error("Error fetching forms:", err);
                // Optionally, set an error state to display a message to the user
            } finally {
                setLoading(false);
            }
        };
        fetchForms();
    }, []);

    const handleCreateNewForm = async () => {
        try {
            const resp = await fetch(`${API_BASE_URL}/form/create/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: "Untitled Form", description: "Form Description" }),
            });
            if (!resp.ok) throw new Error("Failed to create form");
            const data = await resp.json();
            navigate(`/${data.id}`);
        } catch (err) {
            console.error("Error creating new form:", err);
            // Optionally, set an error state to display a message to the user
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Forms</h1>
                <button
                    onClick={handleCreateNewForm}
                    className="bg-violet-800 hover:bg-violet-600 rounded-md font-semibold px-6 py-2 text-white text-sm"
                >
                    Create New Form
                </button>
            </div>

            {forms.length === 0 ? (
                <p className="text-gray-500">No forms created yet. Click “+ New Form” to start.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {forms.map(form => (
                        <div
                            key={form.id}
                            onClick={() => navigate(`/${form.id}`)}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer"
                        >
                            <h2 className="text-lg font-semibold mb-2">{form.title}</h2>
                            <p className="text-sm text-gray-500">{form.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
