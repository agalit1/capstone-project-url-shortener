import React, {useState} from 'react';
import {Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField,} from "@mui/material";
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import axios from "axios";
import * as yup from 'yup';
import {InferType, object, string} from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";


const signUpSchema = object({
    username: string()
        .max(15, "Must be 15 characters or less")
        .required("Name is required"),
    email: string()
        .email("Invalid email")
        .required("Email is required"),
    password: string()
        .min(8, "Must be at least 8 characters")
        .required("Password is required"),
    confirmPassword: string()
        .oneOf([yup.ref("password"), null], "Password must match")
        .required("Confirm password is required")
})

type Props = InferType<typeof signUpSchema>;

function SignUpCard() {

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function onSubmit(values: Props) {
        axios.post("/api/users/signup", values)
            .then((response) => {
                setSuccess(true)
            })
            .catch(() => {
                setErrorMessage("")
            })
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Props>({
        resolver: yupResolver(signUpSchema),
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            {success ? (
                <section>
                    <h1>Registration successful</h1>
                    <p>
                        <a href="#">Sign in</a>
                    </p>
                </section>
            ) : (
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: '#BB86FC'}}>
                        <LockPersonOutlinedIcon/>
                    </Avatar>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}} autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("username")}
                                    required
                                    fullWidth
                                    id="username"
                                label="Username"
                                autoFocus
                            />
                        </Grid>
                        <span className="error">{errors?.username?.message}</span>
                        <Grid item xs={12}>
                            <TextField
                                {...register("email")}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                            />
                        </Grid>
                        <span className="error">{errors?.email?.message}</span>
                        <Grid item xs={12}>
                            <TextField
                                {...register("password")}
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                            />
                        </Grid>
                        <span className="error">{errors?.password?.message}</span>
                        <Grid item xs={12}>
                            <TextField
                                {...register("confirmPassword")}
                                required
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                            />
                        </Grid>
                            <span className="error">{errors?.confirmPassword?.message}</span>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                {/*routerlink*/}
                                <Link href="#" variant="body2" sx={{color: "#BB86FC"}}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </Container>
    );
}

export default SignUpCard;
