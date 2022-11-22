import './App.css';
import GetLink from "./GetLink";
import {Route, BrowserRouter, Routes} from "react-router-dom";

function App() {

    return (
        <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GetLink/>}/>
            </Routes>
        </BrowserRouter>
    </div>
    )
}
export default App;
