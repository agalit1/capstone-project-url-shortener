import React, {useState} from 'react';
import axios from "axios";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography
} from "@mui/material";
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Shortify
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

type Props = {
    onLogin: () => void,
}

function SignInCard(props: Props) {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const userData = {
            email: data.email,
            password: data.password
        };
        axios.post("/api/users/login", userData).then()
            .then(props.onLogin)
            .then(() => {
                setSuccess(true)
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    setErrorMessage("Sign in failed")
                }
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockPersonOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Container>
    );
}

export default SignInCard;
