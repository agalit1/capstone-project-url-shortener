export class ShortenLinkResult {
    shortLink: string;
    longLink: string;

    constructor(shortLink: string, longLink: string) {
        this.shortLink = shortLink;
        this.longLink = longLink;
    }
}