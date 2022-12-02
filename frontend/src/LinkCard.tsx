import React, {useEffect, useState} from 'react';
import {LinkModel} from "./LinkModel";
import axios from "axios";
import isURL from "validator/lib/isURL";

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

    const postForm = () => {
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
            postForm();
            return
        } else {
            setMessage('Invalid link')
        }
        setPostLongLink('');
    }

    // {message}
    return (
        <div className="inputContainer" onSubmit={submitForm}>
            <div>
                <input type="text"
                       placeholder="Enter your url"
                       onChange={(e) => setPostLongLink(e.target.value)}
                       value={postLongLink}/>
                <button
                    onClick={submitForm}>
                    Shorten
                </button>
            </div>
        </div>
    )
}
export default LinkCard;