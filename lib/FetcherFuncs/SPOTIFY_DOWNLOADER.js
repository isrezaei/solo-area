import axios from "axios";

//954253:60f329539d3bf9.52827411

export const SPOTIFY_DOWNLOADER = async (trackID) =>
{
    console.log(trackID)

    try {
        if (trackID)
        {
            return (await axios.get(`https://spotify-downloader.p.rapidapi.com/SpotifytrackDownloader` , {

                    method : 'GET',
                    params : {id : trackID},
                    headers : {
                        'X-RapidAPI-Key': '3cec8d8c46msha90ce5b12fd7ab4p168338jsn8fdd68f47d24',
                        'X-RapidAPI-Host': 'spotify-downloader.p.rapidapi.com',
                    }
                }
            )).data
        }
    }catch (e) {
        alert('rappid api worng')
    }

    return {}
}