import React, {ChangeEvent} from 'react';
import axios from "axios";
import {Avatar, Box, Button, Card, Container, CssBaseline, Grid, TextField, Typography} from "@mui/material";
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import {NavLink} from "react-router-dom";
import AuthContext from "../Context/AuthContext";

type SignInCardState = {
    email: string,
    password: string,
    success: boolean,
    errorMessage: string,
}

class SignInCard extends React.Component<any, SignInCardState> {
    static contextType = AuthContext;

    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            success: false,
            errorMessage: "",
        }
        this.login = this.login.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    login() {
        const {email, password} = this.state;

        axios.post("/api/users/login", {}, {
            auth: {
                username: email,
                password: password
            }
        })
            .then((response) => {
                const Auth: any = this.context;
                const authdata = window.btoa(email + ":" + password)
                const user = {email, authdata}

                Auth.userLogin(user);
                this.setState({
                    success: true
                });
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    this.setState({
                        errorMessage: "Invalid credentials"
                    })
                } else {
                    this.setState({
                        errorMessage: "Login failed"
                    })
                }
            })
    }

    handleEmail(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            email: (e.target.value)
        })
    }

    handlePassword(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: (e.target.value)
        })
    }

    handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.login();
        this.setState({
            email: ""
        })
        this.setState({
            password: ""
        })
    }

    render() {
        return (
            <Card>
                <Container maxWidth="xs" sx={{p: 2}}>
                    <CssBaseline/>
                    {this.state.success ? (
                        <div>
                            <h1>Welcome!</h1>
                            <p>
                                <NavLink to="/">To Homepage</NavLink>
                            </p>
                        </div>
                    ) : (
                        <div>
                            {
                                this.state.errorMessage.length > 0 && <p className="error">{this.state.errorMessage}</p>
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
                                <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{mt: 1}}
                                     autoComplete="off">
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
                                                onChange={this.handleEmail}
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
                                                onChange={this.handlePassword}
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
            </Card>
        );
    }
}
export default SignInCard;
