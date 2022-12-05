import React, {useEffect, useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";

type Props = {
    shortLink: string;
}

const LinkResult = (props: Props) => {

    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCopied(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [copied]);

    if (error) {
        setError(error);
        return <p className="noData">Sorry, something went wrong. Try again later.</p>
    }

    return (
        <> {props.shortLink && (
            <div className="result">
                <p>{props.shortLink}</p>
                <CopyToClipboard
                    text={props.shortLink}
                    onCopy={() => setCopied(true)}
                >
                    <button className={copied ? "copied" : ""}>Copy</button>
                </CopyToClipboard>
            </div>
        )}
        </>
    )
}
export default LinkResult;