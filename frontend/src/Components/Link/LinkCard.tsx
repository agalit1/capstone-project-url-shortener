import React, {ChangeEvent, useState} from 'react';
import axios from "axios";
import isURL from "validator/lib/isURL";
import LinkResult from "./LinkResult";
import {Box, Container, CssBaseline, Grid, TextField} from "@mui/material";

function LinkCard() {

    const [postLongLink, setPostLongLink] = useState<string>('');
    const [shortLink, setShortLink] = useState<string>('');

    const postForm = () => {
        let shortUrl;
        axios.post("/api/links", {
            link: postLongLink,
        }).then((response) => {
            shortUrl = response.data.shortLink;
            setShortLink(shortUrl);
        })
            .catch((error) => {
                console.log("Endpoint not available " + error)
            })
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isURL(postLongLink)) {
            postForm();
            return
        } else {
            // TODO: show popup invalid URL
        }
        setPostLongLink('');
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <form className="inputContainer" onSubmit={handleSubmit}>
                <Box sx={{mt: 4}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="text"
                                placeholder="Enter your url"
                                onChange={(e) => setPostLongLink(e.target.value)}
                                value={postLongLink}/>
                        </Grid>
                    </Grid>
                    <button
                        type="submit">
                        Shorten
                    </button>
                </Box>
                <LinkResult shortLink={shortLink}/>
            </form>
        </Container>

    )
}

export default LinkCard;
