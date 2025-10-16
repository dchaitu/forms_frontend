import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import MainPage from "./components/mainPage";
import {TooltipProvider} from "./components/ui/tooltip";
import PageNotFound from "@/components/pageNotFound";

function App() {
    return (
        <div className="App">
            <TooltipProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={<MainPage/>}/>
                    <Route path="/invalid" element={<PageNotFound />} />
                    <Route path="*" element={<Navigate to="/invalid" />} />

                </Routes>
            </Router>
            </TooltipProvider>
        </div>
    );
}

export default App;
