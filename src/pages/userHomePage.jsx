import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { API_BASE_URL } from "@/constants/constants";
import { Spinner } from "@/components/ui/spinner";

const UserHomePage = () => {
    const [forms, setForms] = useState([]);
    const [formCounts, setFormCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const {userId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch forms and response counts in parallel
                const [formsResp, countsResp] = await Promise.all([
                    fetch(`${API_BASE_URL}/form/${userId}/all/`),
                    fetch(`${API_BASE_URL}/response/count/`)
                ]);

                const formsData = await formsResp.json();
                const countsData = await countsResp.json();

                // Convert count list into a dictionary {formId: count}
                const countsMap = countsData.reduce((acc, item) => {
                    acc[item.form_id] = item.count;
                    return acc;
                }, {});

                setForms(formsData);
                setFormCounts(countsMap);
            } catch (err) {
                console.error("Error fetching forms or counts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
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
                    + New Form
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
                            <p className="text-sm text-gray-600 mt-4">
                                {formCounts[form.id]
                                    ? `${formCounts[form.id]} ${formCounts[form.id] === 1 ? "response" : "responses"}`
                                    : "No responses yet"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserHomePage;
