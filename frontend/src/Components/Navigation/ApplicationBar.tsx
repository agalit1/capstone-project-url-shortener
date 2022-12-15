import React from 'react';
import {AppBar, Box, CssBaseline, Toolbar, Typography} from "@mui/material";
import {Link} from "@mui/icons-material";
import {Link as RouterLink} from "react-router-dom";
import AuthContext from "../Context/AuthContext";

type AppBarProps = {};
type AppBarState = {};

class ApplicationBar extends React.Component<AppBarProps, AppBarState> {
    static contextType = AuthContext;


    render() {
        const Auth: any = this.context;
        const isLoggedIn = Auth.userIsAuthenticated();

        let routes;
        if (!isLoggedIn) {
            routes = <>
                <li>
                    <RouterLink to='/signup'>
                        <Typography variant="h6" component="div" fontFamily='Lato'>
                            Sign Up
                        </Typography>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to='/login'>
                        <Typography variant="h6" component="div" fontFamily='Lato'>
                            Sign In
                        </Typography>
                    </RouterLink>
                </li>
            </>
        } else {
            routes = <>
                <li>
                    <RouterLink to='/my-links'>
                        <Typography variant="h6" component="div" fontFamily='Lato'>
                            My Links
                        </Typography>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to='/' onClick={() => Auth.userLogout()}>
                        <Typography variant="h6" component="div" fontFamily='Lato'>
                            Sign Out
                        </Typography>
                    </RouterLink>
                </li>
            </>
        }

        return (
            <>
                <CssBaseline/>
                <Box sx={{
                    flexShrink: 0,
                    height: '50px',
                }}>
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
                                        {routes}
                                    </ul>
                                </nav>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Box>
            </>
        );
    }
}

export default ApplicationBar;
