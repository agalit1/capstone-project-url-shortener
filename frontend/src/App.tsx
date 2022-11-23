import './App.css';
import GetLink from "./GetLink";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import PostLink from "./PostLink";

function App() {

    return (
        <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<><PostLink/> <GetLink/></>} />
            </Routes>
        </BrowserRouter>
    </div>
    )
}
export default App;
