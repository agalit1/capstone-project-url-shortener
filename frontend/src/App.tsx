import './Styling/App.css';
import LinkCard from "./LinkCard";
import {Route, BrowserRouter, Routes} from "react-router-dom";

function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LinkCard/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
