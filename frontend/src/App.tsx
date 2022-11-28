import './Styling/App.css';
import LinkCard from "./LinkCard";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {CssBaseline, Container, Typography, AppBar, Toolbar, Box} from "@mui/material";
import {Link} from "@mui/icons-material";

function App() {

    return (
        <>
            <CssBaseline/>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="relative">
                    <Toolbar>
                        <Link/>
                        <Typography variant="h6" component="div">
                            Shortify
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container>
                <div>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<LinkCard/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </Container>
        </>
    )
}

export default App;
