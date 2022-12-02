import './style/App.css';
import './style/style';
import LinkCard from "./LinkCard";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {CssBaseline, Container, Typography, AppBar, Toolbar, Box, Grid} from "@mui/material";
import {Link} from "@mui/icons-material";
import BackgroundAnimate from "./BackgroundAnimate";

function App() {


    return (
        <>
            <CssBaseline/>
            <Box sx={{flexGrow: 1, mb: 3}}>
                <AppBar position="relative" sx={{bgcolor: "black"}}>
                    <Toolbar>
                        <Link sx={{color: "#BB86FC", mt: 0.5, mb: 0.2, marginLeft: 3, marginRight: 0.5}}/>
                        <Typography variant="h6" component="div" fontFamily='Lato'>
                            Shortify
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <main>
                <Box>
                    <Container maxWidth="sm">
                        <Typography display="inline" variant="h2" align="center" color="textPrimary" gutterBottom
                                    fontFamily='Lato'>
                            URL <span className="title">Shortener</span>
                        </Typography>
                        <BackgroundAnimate/>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <BrowserRouter>
                                        <Routes>
                                            <Route path='/' element={<LinkCard/>}/>
                                        </Routes>
                                    </BrowserRouter>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Box>
            </main>
        </>
    )
}

export default App;
