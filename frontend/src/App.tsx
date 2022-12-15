import './style/App.css';
import ApplicationBar from "./Components/Navigation/ApplicationBar";
import Footer from "./Components/Navigation/Footer";
import React from "react";
import Content from "./Components/Navigation/Content";
import {Box} from "@mui/material";
import {AuthProvider} from "./Components/Context/AuthContext";

type AppProps = {};
type AppState = {};

class App extends React.Component<AppProps, AppState> {

    render() {
        return (
            <AuthProvider>
                <Box
                    className="app-background"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh'
                    }}
                >
                    <ApplicationBar/>
                    <Content/>
                    <Footer/>
                </Box>
            </AuthProvider>
        )
    }
}
export default App;
