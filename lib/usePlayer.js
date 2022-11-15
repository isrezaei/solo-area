import {useEffect} from "react";
import {Fetch_AccessToken} from "./FetcherFuncs/Fetch_AccessToken";
import {useAsync} from "react-use";
import {useState} from "react";
import {useSession} from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import {useSetRecoilState} from "recoil";
import {SPOTIFY_DEVICE_ID_ATOM} from "../atoms/ItemsAtom";

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}


export const usePlayer = () =>
{

    const SET_SPOTIFY_DEVICE_ID = useSetRecoilState(SPOTIFY_DEVICE_ID_ATOM)

    const [player, setPlayer] = useState(undefined);

    const spotifyApi = useSpotify()
    const {status} = useSession()

    useEffect( () => {

        if (status === 'authenticated')
        {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;

            document.body.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = () => {

                const player = new window.Spotify.Player({
                    name: 'Spotify Web Playback',
                    getOAuthToken: cb => { cb(spotifyApi.getAccessToken()); },
                    volume: 0.5
                });

                setPlayer(player);

                player.addListener('ready', ({ device_id }) => {
                    SET_SPOTIFY_DEVICE_ID(device_id)
                    console.log('Ready with Device ID', device_id);
                });


                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                player.connect();
            };
        }


    }, [status]);


    return player
}