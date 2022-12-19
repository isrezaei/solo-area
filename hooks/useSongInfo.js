import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {useAsync} from "react-use";
import {CURRENT_TRACK_ID_STATE} from "../atoms/SongAtom";
import axios from "axios";
import useSpotify from "./useSpotify";
import {useSession} from "next-auth/react";
import {IS_UPDATE} from "../atoms/SongAtom";


export default function useSongInfo ()
{
    const spotifyApi = useSpotify()
    const {data : session , status} = useSession()

    const CURRENT_TRACK_ID_PLAYED = useRecoilValue(CURRENT_TRACK_ID_STATE)

    const [currentlyTrack , setCurrentlyTrack] = useState([])

    useAsync(async () => {
        if (CURRENT_TRACK_ID_PLAYED && spotifyApi.getAccessToken())
        {
            await fetch(
                `https://api.spotify.com/v1/tracks/${CURRENT_TRACK_ID_PLAYED}` , {
                    method : 'GET',
                    headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                    },
                }
            )
                .then(async res => setCurrentlyTrack(await res.json()))
                .catch(reason => console.log(reason))
        }

    } , [CURRENT_TRACK_ID_PLAYED])





    return {currentlyTrack}
}

