import React from 'react';
import {Box, Link, Typography} from "@mui/material";

function Footer() {

    return (

        <Box
            textAlign="center"
            sx={{
                flexShrink: 0,
                height: '50px',
            }}
        >
            <Typography variant="body2" color="text.secondary">
                {'Copyright © '}
                <Link color="inherit" href="/">
                    Shortify
                </Link>{' '}
                {new Date().getFullYear()}
            </Typography>
        </Box>

    );
}

export default Footer;
