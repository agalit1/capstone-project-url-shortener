import React, {useEffect, useState} from 'react';
import {LinkModel} from "./LinkModel";
import axios from "axios";

function GetLink() {

    const [links, setLinks] = useState<LinkModel[]>([]);

    useEffect(() => {
        fetchAllLinks()
    }, [])

    const fetchAllLinks = () => {
        axios.get("/api/links")
            .then(response => response.data)
            .catch((error) => console.log("Endpoint not available " + error))
            .then((data) => {
                setLinks(data)
            })
    }

    const linkList = links.map((current) =>
        <li>{current.link}</li>
    )

    return <>
        <h4>List of links:</h4>
        <ul>{linkList}</ul>
    </>
}
export default GetLink;