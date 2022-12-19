import {useEffect} from "react";
import {useState} from "react";
import {FETCH_ACCESS_TOKEN} from "../lib/FetcherFuncs/FETCH_ACCESS_TOKEN";
import useSWR from "swr";



 export const usePlayer = () =>
{


    const [player, setPlayer] = useState(undefined);

    const {data : token_data} = useSWR('GET TOKEN' , async () => (await FETCH_ACCESS_TOKEN()))


    useEffect(  () => {

        if (token_data)
        {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;

            document.body.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = () => {

                const player = new window.Spotify.Player({
                    name: 'Spotify Web Playback',
                    getOAuthToken: cb => { cb(token_data.access_token); },
                    volume: 0.5
                });


                setPlayer(player);
            };
        }


    }, [token_data]);




    return player
}

