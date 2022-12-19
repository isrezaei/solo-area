import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-email',
    'streaming',
    'user-read-private',
    'user-library-read',
    'user-top-read',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-follow-read',
    'user-read-currently-playing',
].join(',')

const params = {
    scope: scopes,
}
const queryParamString = new URLSearchParams(params)


//!! URI EXAMPLE FIRST LOGIN AND GET ALL NEED SCOPES
// const Uri = "https://accounts.spotify.com/authorize?client_id=bda10cd719564898818245d97727de7e&response_type=code&redirect_uri=http://localhost:3000/callback&scope=" + queryParamString.toString()



const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

export default spotifyApi;

export const FIRST_INITIAL_URL_DATA = "https://accounts.spotify.com/authorize?" + queryParamString.toString()