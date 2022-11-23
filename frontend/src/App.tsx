import './App.css';
import LinkCard from "./LinkCard";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import PostLink from "./PostLink";

function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<><PostLink/> <LinkCard/></>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
