import React, {ChangeEvent} from 'react';
import axios from "axios";
import isURL from "validator/lib/isURL";
import LinkResult from "./LinkResult";
import {Alert, AlertTitle, Card, CardContent, Container, CssBaseline, Stack, TextField} from "@mui/material";
import {ShortenLinkResult} from "./Model";

type LinkPageProps = {};

type LinkPageState = {
    requestLongLink: string,
    errorMsg: string,
    results: ShortenLinkResult[]
};

class LinkPage extends React.Component<LinkPageProps, LinkPageState> {
    constructor(props: LinkPageProps) {
        super(props);
        this.state = {
            requestLongLink: '',
            errorMsg: '',
            results: [],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    postForm() {
        axios.post("/api/links", {
            link: this.state.requestLongLink,
        }).then((response) => {
            const longLink = this.state.requestLongLink;
            const shortLink = response.data.shortLink;
            const newResult = new ShortenLinkResult(shortLink, longLink);

            const newResults = this.state.results.slice();
            newResults.push(newResult);

            this.setState({
                results: newResults
            });
        })
            .catch((error) => {
                console.log("Endpoint not available " + error)
            })
    }

    handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isURL(this.state.requestLongLink)) {
            this.postForm();
            this.setState({
                errorMsg: "",
            });
            return
        } else {
            this.setState({
                errorMsg: "Invalid URL"
            });
        }
    }

    handleChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            requestLongLink: e.target.value
        });
    }


    render() {
        return (
            <Container maxWidth="sm">
                <Stack spacing={2}>
                    <CssBaseline/>
                    {this.state.errorMsg.length > 0 &&
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {this.state.errorMsg}
                        </Alert>
                    }

                    <form onSubmit={this.handleSubmit}>
                        <Card>
                            <CardContent sx={{display: 'flex'}}>
                                <TextField sx={{flexGrow: 1}}
                                           fullWidth
                                           type="text"
                                           placeholder="Enter your URL"
                                           onChange={this.handleChange}
                                           value={this.state.requestLongLink}
                                />
                                <button className="button" type="submit">
                                    Shorten
                                </button>
                            </CardContent>
                        </Card>
                    </form>

                    {
                        this.state.results.map((slr: ShortenLinkResult) => {
                            return <LinkResult longLink={slr.longLink} shortLink={slr.shortLink}/>
                        })
                    }

                    {/*<LinkResult shortLink={this.state.shortLink}/>*/}
                    {/*<LinkResult longLink={this.state.postLongLink}*/}
                    {/*    shortLink={this.state.shortLink}/>*/}
                </Stack>
            </Container>

        )
    }

}

export default LinkPage;
