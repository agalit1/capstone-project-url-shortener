import './style/App.css';
import './style/style';
import LinkCard from "./Components/Link/LinkCard";
import {Route, Routes} from "react-router-dom";
import {Typography} from "@mui/material";
import BackgroundAnimate from "./Components/Link/BackgroundAnimate";
import LinkResult from "./Components/Link/LinkResult";
import {useState} from "react";
import SignUpCard from "./Components/User/SignUpCard";
import ApplicationBar from "./ApplicationBar";


function App() {

    const [shortLink, setShortLink] = useState("");

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
                    <Route path='/' element={<LinkCard setShortLink={setShortLink}/>}/>
                    <Route path='/signup' element={<SignUpCard/>}/>
                </Routes>
                <LinkResult shortLink={shortLink}/>
                <BackgroundAnimate/>
            </div>
        </>
    )
}
export default App;
