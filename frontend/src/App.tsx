import './style/App.css';
import './style/style';
import LinkCard from "./LinkCard";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {CssBaseline, Container, Typography, AppBar, Toolbar, Box, Grid} from "@mui/material";
import {Link} from "@mui/icons-material";

function App() {


    return (
        <>
            <CssBaseline/>
            <Box sx={{flexGrow: 1, mb: 3}}>
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
                <Box>
                    <Container maxWidth="sm">
                        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                            URL Shortener
                        </Typography>
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
