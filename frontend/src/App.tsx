import './style/App.css';
import './style/style';
import LinkCard from "./Components/Link/LinkCard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppBar, Box, Button, CssBaseline, Toolbar, Typography} from "@mui/material";
import {Link} from "@mui/icons-material";
import BackgroundAnimate from "./Components/Link/BackgroundAnimate";
import LinkResult from "./Components/Link/LinkResult";
import {useState} from "react";
import SignUpCard from "./Components/User/SignUpCard";


function App() {

    const [shortLink, setShortLink] = useState("");

    return (
        <>
            <CssBaseline/>
            <Box sx={{flexGrow: 1, mb: 3}}>
                <AppBar position="relative" sx={{bgcolor: "white"}}>
                    <Toolbar>
                        <Link sx={{color: "#BB86FC", mt: 0.5, mb: 0.2, marginLeft: 3, marginRight: 0.5}}/>
                        <Typography variant="h6" component="div" fontFamily='Lato'>
                            Shortify
                        </Typography>
                        <div className="signup">
                            <Button color="inherit">Sign Up</Button>
                            <SignUpCard/>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className="container">
                <Typography display="inline" variant="h2" align="center" color="textPrimary" gutterBottom
                            fontFamily='Lato'>
                    URL <span className="title">Shortener</span>
                    <p className="slogan">Shortify - the shorter the better.</p>
                </Typography>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<LinkCard setShortLink={setShortLink}/>}/>
                    </Routes>
                </BrowserRouter>
                <LinkResult shortLink={shortLink}/>
                <BackgroundAnimate/>
            </div>
        </>
    )
}

export default App;
