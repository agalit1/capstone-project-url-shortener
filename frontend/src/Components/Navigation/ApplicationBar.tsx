import React from 'react';
import {AppBar, Box, CssBaseline, Toolbar, Typography} from "@mui/material";
import {Link} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";

function ApplicationBar() {
    return (
        <>
            <CssBaseline/>
            <Box sx={{flexGrow: 1, mb: 3}}>
                <AppBar position="relative" sx={{bgcolor: "black"}}>
                    <Toolbar>
                        <div className="signup">
                            <nav className="nav">
                                <ul>
                                    <li>
                                        <RouterLink to='/'>
                                            <Link sx={{
                                                color: "#BB86FC",
                                                mt: 0.5,
                                                mb: 0.2,
                                                marginLeft: 3,
                                                marginRight: 0.5
                                            }}/>
                                            <Typography variant="h6" component="div" fontFamily='Lato'>
                                                Shortify
                                            </Typography>
                                        </RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to='/signup'>
                                            <Typography variant="h6" component="div" fontFamily='Lato'>
                                                Sign Up
                                            </Typography>
                                        </RouterLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </Toolbar>
                </AppBar>
                <Toolbar>
                </Toolbar>
            </Box>
        </>
    );
}

export default ApplicationBar;
