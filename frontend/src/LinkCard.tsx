import React, {useState} from 'react';
import axios from "axios";
import isURL from "validator/lib/isURL";

type Props = {
    setShortLink: (shortLink: string) => void;
}

function LinkCard(props: Props) {

    const [postLongLink, setPostLongLink] = useState<string>('');

    const postForm = () => {
        let shortUrl;
        axios.post("/api/links", {
            link: postLongLink,
        }).then((response) => {
            shortUrl = response.data.shortLink;
            props.setShortLink(shortUrl);
        })
            .catch((error) => {
                console.log("Endpoint not available " + error)
            })
    }

    const handleSubmit = (e: any) => {
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
        <div className="inputContainer" onSubmit={handleSubmit}>
            <div>
                <input type="text"
                       placeholder="Enter your url"
                       onChange={(e) => setPostLongLink(e.target.value)}
                       value={postLongLink}/>
                <button
                    onClick={handleSubmit}>
                    Shorten
                </button>
            </div>
        </div>
    )
}

export default LinkCard;