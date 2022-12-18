import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Card, CardContent, Typography} from "@mui/material";

type LinkResultProps = {
    longLink: string;
    shortLink: string;
}

type LinkResultState = {
    buttonText: string
};

class LinkResult extends React.Component<LinkResultProps, LinkResultState> {
    constructor(props: LinkResultProps) {
        super(props);
        this.state = {
            buttonText: "Copy"
        }
    }

    handleCopy(copied: boolean) {
        if (copied) {
            this.setState({
                buttonText: "Copied ✓"
            });
            setTimeout(() => {
                this.handleCopy(false);
            }, 1000);
        } else {
            this.setState({
                buttonText: "Copy"
            });
        }
    }

    render() {
        if (!this.props.shortLink) {
            return null;
        }

        return (
            <Card>
                <CardContent className="link-result-card-container">
                    <div className="long-link-container">
                        <Typography className="long-link-text">
                            {this.props.longLink}
                        </Typography>

                    </div>

                    <div className="short-link-container">
                        <Typography>
                            <a href={"http://" + this.props.shortLink} target="_blank" rel="noreferrer">
                                {this.props.shortLink}
                            </a>
                        </Typography>
                    </div>

                    <CopyToClipboard
                        text={this.props.shortLink}
                        onCopy={() => this.handleCopy(true)}
                    >
                        <button className="button button-copy">{this.state.buttonText}</button>
                    </CopyToClipboard>
                </CardContent>
            </Card>
        );
    }
}

export default LinkResult;
