export function getYoutubeVideoId(url: string) {
    const regexp =
        /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})|^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/;

    if (!regexp.test(url)) throw new Error("Invalid URL");

    const match = url.match(regexp);
    if (match === null) throw new Error("Can't extract video ID");

    return match[1] || match[2];
}
