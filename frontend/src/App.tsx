import './style/App.css';
import ApplicationBar from "./Components/Navigation/ApplicationBar";
import Footer from "./Components/Navigation/Footer";
import React from "react";
import Content from "./Components/Navigation/Content";
import {Box} from "@mui/material";

type AppProps = {};
type AppState = {
    isLoggedIn: boolean
};

class App extends React.Component<AppProps, AppState> {
    state: AppState = {
        isLoggedIn: false
    };

    handleLogIn(loggedIn: boolean) {
        this.setState({
            isLoggedIn: loggedIn
        });
    }

    render() {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh'
                }}
            >
                <ApplicationBar isLoggedIn={this.state.isLoggedIn}/>
                <Content/>
                <Footer/>
            </Box>
        )
    }
}

export default App;
