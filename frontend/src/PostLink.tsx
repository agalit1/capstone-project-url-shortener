import React, {ChangeEvent, useState} from 'react';
import axios from "axios";

function PostLink() {

    const [longLink, setLongLink] = useState<string>('');

    const postLink = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post("/api/links", {
            link: longLink,
        })
            .catch((error) => {
                console.log("Endpoint not available " + error)
            })
    }

    return (
        <div>
            <form onSubmit={postLink}>
                <label htmlFor="Paste your long url">Enter your long url</label>
                <input type="text" id={"Paste your long url"} onChange={(e) => setLongLink(e.target.value)}
                       value={longLink}/>
                <button>Click</button>
            </form>
        </div>
    );
}

export default PostLink;