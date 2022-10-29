import {useState} from "react";
import {useRecoilValue} from "recoil";
import {useAsync} from "react-use";
import {CURRENT_TRACK_ID_STATE} from "../atoms/SongAtom";
import axios from "axios";
import useSpotify from "./useSpotify";

export default function useSongInfo ()
{
    const spotifyApi = useSpotify()



    const CURRENT_TRACK_ID_PLAYED = useRecoilValue(CURRENT_TRACK_ID_STATE)

    const [lastlySongPlayed , setLastlySongPlayed] = useState(null)


    useAsync(async () => {

        if (CURRENT_TRACK_ID_PLAYED)
            return await axios({
                method : 'get',
                url : `https://api.spotify.com/v1/tracks/${CURRENT_TRACK_ID_PLAYED}`,
                headers : {
                    Authorization : `Bearer ${spotifyApi.getAccessToken()}`
                }
            }).then(res => setLastlySongPlayed(res.data))

    } , [CURRENT_TRACK_ID_PLAYED , spotifyApi])

    return lastlySongPlayed
}

