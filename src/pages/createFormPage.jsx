import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Header from "@/constants/header";
import {API_BASE_URL} from "@/constants/constants";
import FormEditor from "@/components/FormEditor";
import FormHeader from "@/components/FormHeader";
import {Spinner} from "@/components/ui/spinner";

const CreateFormPage = () => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { formId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (formId) {
            setLoading(true);
            const fetchData = async () => {
                try {
                    const resp = await fetch(`${API_BASE_URL}/form/${formId}/complete/`);
                    if (!resp.ok) {
                        navigate('/404');
                        return;
                    }
                    const data = await resp.json();
                    setFormData(data);
                } catch (error) {
                    console.error("Error fetching form data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        } else {
            setFormData(null);
            setLoading(false);
        }
    }, [formId, navigate]);

    const handleFormCreate = (newForm) => {
        navigate(`/${newForm.id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    if (!formId) {
        return (
            <div id="createFormPage">
                <div className="bg-violet-100 min-h-screen px-10 py-4">
                    <FormHeader onSave={handleFormCreate} />
                </div>
            </div>
        );
    }

    if (formData) {
        return (
            <div id="mainPage">
                <Header formId={formId} responseLink={formData?.response_link}/>
                <div id="form" className="bg-violet-100 min-h-screen w-[70%] mx-auto px-10 py-4">
                    <FormEditor initialFormData={formData} formId={formId} />
                </div>
            </div>
        );
    }

    return <div>Form not found or error loading form.</div>;
};

export default CreateFormPage;