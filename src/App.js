import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import MainPage from "./components/mainPage";
import {TooltipProvider} from "./components/ui/tooltip";

function App() {
    return (
        <div className="App">
            <TooltipProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={<MainPage/>}/>

                </Routes>
            </Router>
            </TooltipProvider>
        </div>
    );
}

export default App;
