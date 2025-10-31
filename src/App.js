import './App.css';
import { Navigate, Route, Routes} from 'react-router-dom';
import CreateFormPage from "./pages/createFormPage";
import {TooltipProvider} from "./components/ui/tooltip";
import PageNotFound from "@/components/pageNotFound";
import SettingsPage from "@/pages/settingsPage";
import ResponsesPage from "@/pages/responsesPage";
import AnswerPage from "./pages/AnswerPage";
import UserHomePage from "@/pages/userHomePage";
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

import {UserProvider} from "./context/UserContext";

function App() {
    return (
        <div className="App">
            <UserProvider>
                <TooltipProvider>
                    <Routes>
                        <Route exact path="/" element={<LandingPage/>}/>
                        <Route exact path="/home" element={<UserHomePage/>}/>
                        <Route exact path="/register" element={<RegistrationPage/>}/>
                        <Route exact path="/login" element={<LoginPage/>}/>
                        <Route exact path="/:formId" element={<CreateFormPage/>}/>
                        <Route path="/invalid" element={<PageNotFound />} />
                        <Route path="*" element={<Navigate to="/invalid" />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/responses/:formId" element={<ResponsesPage />} />
                        <Route path="/response/:unique_id" element={<AnswerPage />} />
                    </Routes>
                </TooltipProvider>
            </UserProvider>
        </div>
    );
}

export default App;
