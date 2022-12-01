import React, {useEffect, useState} from 'react';
import {LinkModel} from "./LinkModel";
import axios from "axios";
import isURL from "validator/lib/isURL";
import {Button, Stack, TextField} from "@mui/material";

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

    // eslint-disable-next-line
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
        <Stack
            direction="row"
            spacing={2}
            display="flex"
            justifyContent="space-between"
            component="form"
            onSubmit={submitForm}>
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
            <Stack>
                <Button
                    type="submit"
                    size="medium"
                    variant="contained"
                    sx={{mt: 2, mb: 3}}
                >
                    Shorten
                </Button>
                {message}
            </Stack>
        </Stack>
    </>
}
export default LinkCard;