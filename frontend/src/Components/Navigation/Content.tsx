import React from 'react';
import {Box, Typography} from "@mui/material";
import BackgroundAnimate from "../Link/BackgroundAnimate";
import {Route, Routes} from "react-router-dom";
import LinkCard from "../Link/LinkCard";
import SignUpCard from "../User/SignUpCard";
import SignInCard from "../User/SignInCard";

function Content() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'center',
                paddingTop: '50px',
                paddingBottom: '50px',
                flex: '1 0 auto'
            }}
        >
            <Typography display="inline" variant="h2" align="center" color="textPrimary" gutterBottom
                        fontFamily='Lato'>
                URL <span className="title">Shortener</span>
                <p className="slogan">Shortify - the shorter the better.</p>
            </Typography>
            <BackgroundAnimate/>
            <Routes>
                <Route path='/' element={<LinkCard/>}/>
                <Route path='/signup' element={<SignUpCard/>}/>
                <Route path='/login' element={<SignInCard/>}/>
            </Routes>
        </Box>
    );
}

export default Content;