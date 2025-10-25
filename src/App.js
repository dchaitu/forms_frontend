import './App.css';
import { Navigate, Route, Routes} from 'react-router-dom';
import MainPage from "./pages/mainPage";
import {TooltipProvider} from "./components/ui/tooltip";
import PageNotFound from "@/components/pageNotFound";
import SettingsPage from "@/pages/settingsPage";
import ResponsesPage from "@/pages/responsesPage";
import AnswerPage from "./pages/AnswerPage";
import HomePage from "@/pages/homePage";

function App() {
    return (
        <div className="App">
            <TooltipProvider>
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route exact path="/:formId" element={<MainPage/>}/>
                    <Route path="/invalid" element={<PageNotFound />} />
                    <Route path="*" element={<Navigate to="/invalid" />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/responses/:formId" element={<ResponsesPage />} />
                    <Route path="/response/:unique_id" element={<AnswerPage />} />
                </Routes>
            </TooltipProvider>
        </div>
    );
}

export default App;
