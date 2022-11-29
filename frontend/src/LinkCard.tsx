import React, {useEffect, useState} from 'react';
import {LinkModel} from "./LinkModel";
import axios from "axios";
import './Styling/LinkCard.css';
import isURL from "validator/lib/isURL";
import {Box, Button, Container, Grid, TextField} from "@mui/material";

function LinkCard() {

    const [getLinks, setGetLinks] = useState<LinkModel[]>([]);
    const [postLongLink, setPostLongLink] = useState<string>('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAllLinks()
    }, [])

    const fetchAllLinks = () => {
        axios.get("/api/links")
            .then((response) => {
                setGetLinks(response.data);
            })
            .catch((error) => console.log("Endpoint not available " + error))
    }

    const linkList = getLinks.map((current) =>
        <li>{current.link}</li>
    )

    const postLink = () => {
        let shortUrl;
        axios.post("/api/links", {
            link: postLongLink,
        }).then((response) => {
            shortUrl = response.data.shortLink;
            setMessage("Short Url:" + shortUrl);
        })
            .catch((error) => {
                console.log("Endpoint not available " + error)
            })

    }

    const submitForm = (e: any) => {
        e.preventDefault();
        if (isURL(postLongLink)) {
            setMessage('');
            postLink();
        } else {
            setMessage('Invalid link')
        }
        setPostLongLink('');
    }

    return <>
        <Box
            component="form"
            display="flex"
            onSubmit={submitForm}>
            <Container maxWidth="md">
                <TextField
                    sx={{width: 500}}
                    margin="normal"
                    fullWidth
                    id="input-link"
                    label="Enter your url"
                    autoFocus
                    onChange={(e) => setPostLongLink(e.target.value)}
                    value={postLongLink}
                />
                <Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            size="large"
                            variant="contained"
                            sx={{mt: 3, mb: 3}}
                        >
                            Shorten
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            {message}
        </Box>
    </>
}
export default LinkCard;