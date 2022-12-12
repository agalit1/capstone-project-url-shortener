import React, {useEffect, useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import {Box, Container, CssBaseline, Grid} from "@mui/material";

type Props = {
    shortLink: string;
}

const LinkResult = (props: Props) => {

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCopied(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [copied]);

    return (
        <>
            <Container component="main">
                <CssBaseline/>
                <Box>
                    <Grid container>
                        <Grid item>
                            {props.shortLink && (
                                <div className="result">
                                    <p>{props.shortLink}</p>
                                    <CopyToClipboard
                                        text={props.shortLink}
                                        onCopy={() => setCopied(true)}
                                    >
                                        <button className={copied ? "copied" : ""}>Copy</button>
                                    </CopyToClipboard>
                                    {copied ? <span className="copied"><CheckRoundedIcon/></span> : null}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}
export default LinkResult;
