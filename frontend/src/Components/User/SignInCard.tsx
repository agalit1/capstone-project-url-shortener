import React, {ChangeEvent, useState} from 'react';
import axios from "axios";
import {Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography} from "@mui/material";
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import {NavLink} from "react-router-dom";

function SignInCard() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const login = () => {
        console.log(email);
        console.log(password);

        axios.post("/api/users/login", {}, {
            auth: {
                username: email,
                password: password
            }
        })
            .then((response) => {
                console.log(response);
                setSuccess(true)
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    setErrorMessage("Invalid credentials")
                } else {
                    setErrorMessage("Login failed")
                }
            })
    }

    function handleEmail(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePassword(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        login();
        setEmail("");
        setPassword("");
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            {success ? (
                <div>
                    <h1>Welcome!</h1>
                    <p>
                        <NavLink to="#">Sign in</NavLink>
                    </p>
                </div>
            ) : (
                <div>
                    {
                        errorMessage.length > 0 && <p>{errorMessage}</p>
                    }
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: '#BB86FC'}}>
                            <LockPersonOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}} autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoFocus
                                        onChange={handleEmail}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        onChange={handlePassword}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <NavLink to="/signup">
                                        {"Don't have an account? Sign Up"}
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </div>
            )}
        </Container>
    );
}

export default SignInCard;
