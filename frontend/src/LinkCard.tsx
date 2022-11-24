import React, {ChangeEvent, useEffect, useState} from 'react';
import {LinkModel} from "./LinkModel";
import axios from "axios";
import './Styling/LinkCard.css';

function LinkCard() {

    const [getLinks, setGetLinks] = useState<LinkModel[]>([]);
    const [postLongLink, setPostLongLink] = useState<string>('');

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

    const postLink = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post("/api/links", {
            link: postLongLink,
        })
            .catch((error) => {
                console.log("Endpoint not available " + error)
            })
    }

    return <>
            <form onSubmit={postLink}>
                <label htmlFor="Paste your long url">Enter your long url</label>
                <input type="text" id={"Paste your long url"} onChange={(e) => setPostLongLink(e.target.value)}
                       value={postLongLink}/>
                <button>Click</button>
                <h4>MyUrls:</h4>
                <ul>{linkList}</ul>
            </form>
        </>
}
export default LinkCard;