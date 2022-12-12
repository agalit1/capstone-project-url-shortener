import React from 'react';
import {Box, Link, Typography} from "@mui/material";

function Footer() {

    return (

        <Box
            textAlign="center"
            // pt={{xs: 5, sm: 10}}
            // pb={{xs: 5, sm: 0}}
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