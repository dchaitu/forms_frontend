import {useNavigate} from "react-router-dom";
import {HomeIcon} from "lucide-react";

const PageNotFound = () => {
    const navigate = useNavigate();

    const goToMainPage = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-6">The page you are looking for does not exist or has been moved.</p>
            <button
                onClick={goToMainPage}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 p-4 text-white rounded-xl"
            >
                <HomeIcon className="h-5 w-5" />
                Go to Main Page
            </button>
        </div>
    )
}

export default PageNotFound;