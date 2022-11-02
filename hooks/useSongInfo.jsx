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

    const updateCurrentTrack = useRecoilValue(IS_UPDATE)

    const CURRENT_TRACK_ID_PLAYED = useRecoilValue(CURRENT_TRACK_ID_STATE)

    const [lastlySongPlayed , setLastlySongPlayed] = useState(null)


    useAsync(async () => {

                if (CURRENT_TRACK_ID_PLAYED) {

                    const trackInfo = await fetch(
                        `	https://api.spotify.com/v1/me/player/currently-playing`,
                        {
                            headers: {
                                Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                            },
                        }
                    );

                    const res = await trackInfo.json();

                    setLastlySongPlayed(res.item);
                }

    } , [CURRENT_TRACK_ID_PLAYED , spotifyApi , updateCurrentTrack])


    // useEffect(() => {
    //
    //     const fetchSongInfo = async () => {
    //
    //         if (CURRENT_TRACK_ID_PLAYED) {
    //
    //             const trackInfo = await fetch(
    //                 `	https://api.spotify.com/v1/me/player/currently-playing`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
    //                     },
    //                 }
    //             );
    //
    //             const res = await trackInfo.json();
    //
    //             setLastlySongPlayed(res.item);
    //         }
    //     };
    //     fetchSongInfo();
    //
    //
    // } , [CURRENT_TRACK_ID_PLAYED , spotifyApi , updateCurrentTrack])


    return lastlySongPlayed
}

