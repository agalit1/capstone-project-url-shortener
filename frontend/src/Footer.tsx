import React from 'react';
import {Box, Container, Link, Typography} from "@mui/material";

function Footer() {

    return (
        <footer>
            <Container>
                <Box textAlign="center" pt={{xs: 5, sm: 10}} pb={{xs: 5, sm: 0}}>
                    <Typography variant="body2" color="text.secondary">
                        {'Copyright © '}
                        <Link color="inherit" href="/">
                            Shortify
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </Container>
        </footer>
    );
}

export default Footer;