import React, {useEffect, useState} from 'react';
import {LinkModel} from "./LinkModel";
import axios from "axios";

function LinkCard() {

    const [links, setLinks] = useState<LinkModel[]>([]);

    useEffect(() => {
        fetchAllLinks()
    }, [])

    const fetchAllLinks = () => {
        axios.get("/api/links")
            .then((response) => {
                setLinks(response.data);
            })
            .catch((error) => console.log("Endpoint not available " + error))
    }

    const linkList = links.map((current) =>
        <li>{current.link}</li>
    )

    return <>
        <h4>MyUrls:</h4>
        <ul>{linkList}</ul>
    </>
}
export default LinkCard;