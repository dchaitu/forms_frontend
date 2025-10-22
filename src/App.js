import './App.css';
import { Navigate, Route, Routes} from 'react-router-dom';
import MainPage from "./pages/mainPage";
import {TooltipProvider} from "./components/ui/tooltip";
import PageNotFound from "@/components/pageNotFound";
import SettingsPage from "@/pages/settingsPage";
import ResponsesPage from "@/pages/responsesPage";

function App() {
    return (
        <div className="App">
            <TooltipProvider>
                <Routes>
                    <Route exact path="/" element={<MainPage/>}/>
                    <Route path="/invalid" element={<PageNotFound />} />
                    <Route path="*" element={<Navigate to="/invalid" />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route  path="/responses" element={<ResponsesPage/>} />

                </Routes>
            </TooltipProvider>
        </div>
    );
}

export default App;
