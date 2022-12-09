import './style/App.css';
import './style/style';
import LinkCard from "./Components/Link/LinkCard";
import {Route, Routes} from "react-router-dom";
import {Typography} from "@mui/material";
import BackgroundAnimate from "./Components/Link/BackgroundAnimate";
import SignUpCard from "./Components/User/SignUpCard";
import ApplicationBar from "./Components/Navigation/ApplicationBar";


function App() {

    return (
        <>
            <ApplicationBar/>
            <div className="container">
                <Typography display="inline" variant="h2" align="center" color="textPrimary" gutterBottom
                            fontFamily='Lato'>
                    URL <span className="title">Shortener</span>
                    <p className="slogan">Shortify - the shorter the better.</p>
                </Typography>
                <Routes>
                    <Route path='/' element={<LinkCard/>}/>
                    <Route path='/signup' element={<SignUpCard/>}/>
                    <Route path='/login' element={<SignUpCard/>}/>
                </Routes>
                <BackgroundAnimate/>
            </div>
        </>
    )
}
export default App;
