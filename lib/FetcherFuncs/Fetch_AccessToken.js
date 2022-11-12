
export const Fetch_AccessToken = async () =>
{
    //?GET ACCESS TOKEN BY REFRESH TOKEN (WHEN EXPIRED ACCESS TOKEN)
    const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    })

     return response.json();
}