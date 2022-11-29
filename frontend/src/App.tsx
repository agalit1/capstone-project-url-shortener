import './Styling/App.css';
import LinkCard from "./LinkCard";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {CssBaseline, Container, Typography, AppBar, Toolbar, Box, Grid} from "@mui/material";
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
            <main>
                <div>
                    <Container maxWidth="sm">
                        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                            URL Shortener
                        </Typography>
                        <div>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <BrowserRouter>
                                        <Routes>
                                            <Route path='/' element={<LinkCard/>}/>
                                        </Routes>
                                    </BrowserRouter>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
        </>
    )
}

export default App;
