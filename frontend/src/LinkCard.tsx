import React, {useEffect, useState} from 'react';
import {LinkModel} from "./LinkModel";
import axios from "axios";
import './Styling/LinkCard.css';
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

    const linkList = getLinks.map((current) =>
        <li>{current.link}</li>
    )

    const postLink = () => {
        axios.post("/api/links", {
            link: postLongLink,
        })
            .catch((error) => {
                console.log("Endpoint not available " + error)
            })
    }

    const submitForm = (e: any) => {
        e.preventDefault();
        if (isURL(postLongLink)) {
            setMessage('')
            postLink();
        } else {
            setMessage('Invalid link')
        }
        setPostLongLink('');
    }

    return <>
        <form onSubmit={submitForm}>
            <label htmlFor="Paste your long url">Enter your long url</label>
            <input type="text" id="input-link" onChange={(e) => setPostLongLink(e.target.value)}
                   value={postLongLink}/>
            <button>Shorten</button>
            {message}
            <h4>MyUrls:</h4>
            <ul>{linkList}</ul>
        </form>
    </>
}
export default LinkCard;