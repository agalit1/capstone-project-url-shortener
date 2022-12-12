import React, {useState} from 'react';
import axios from "axios";
import {Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography} from "@mui/material";
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import {NavLink} from "react-router-dom";
import {InferType, object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";

const signInSchema = object({
    email: string()
        .email("Invalid email")
        .required("Email is required"),
    password: string()
        .required("Password is required"),
})

type Props = InferType<typeof signInSchema>;

function SignInCard() {

    const [success, setSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onSubmit = (values: Props) => {
        axios.post("/api/users/login", values)
            .then((response) => {
                setSuccess(true)
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    setErrorMessage("Sign in failed")
                }
            })
    }

    const {
        handleSubmit,
        formState: {errors},
    } = useForm<Props>({
        resolver: yupResolver(signInSchema),
    });

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
                    <p>{errorMessage}</p>
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
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <span className="error">{errors?.email?.message}</span>
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
                                        autoComplete="current-password"
                                    />
                                    <span className="error">{errors?.password?.message}</span>
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
