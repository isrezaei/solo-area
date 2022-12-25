import axios from "axios";

export const SPOTIFY_DOWNLOADER = async (trackID) =>
{

    if (trackID)
    {

        console.log(trackID)

        console.log(trackID)

        // return (await axios.get('https://spotify-downloader.p.rapidapi.com/SpotifyDownloader' , {
        //
        //             method : 'GET',
        //             params : {
        //                 url : `https://open.spotify.com/track/${trackID}`
        //             },
        //             headers : {
        //                 'X-RapidAPI-Key': '269926aecemsh263311c0955020ep18fd21jsnd518d7a7071a',
        //                 'X-RapidAPI-Host': 'spotify-downloader.p.rapidapi.com'
        //             }
        //         }
        //     )).data

        return (await axios.get(`https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud?track=${trackID}` , {

                method : 'GET',
                headers : {
                    'X-RapidAPI-Key': '269926aecemsh263311c0955020ep18fd21jsnd518d7a7071a',
                    'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
                }
            }
        )).data

    }

    return {}
}