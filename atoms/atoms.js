import {atom} from "recoil";

export const NEW_RELEASES_ALBUMS_TRACK_ATOM = atom({
    key : 'NEW RELEASES ALBUMS TRACK' + Math.random(),
    default : []
})


export const SPOTIFY_DEVICE_ID_ATOM = atom({
    key : 'SPOTIFY DEVICE ID',
    default : undefined
})

export const SPOTIFY_TRACKS_ID_ATOM = atom({
    key : 'SPOTIFY TRACKS ID',
    default : undefined
})

export const MY_PLAY_LIST_ID_ATOM = atom({
    key : 'MY PLAY LIST ID',
    default : '33gqi6xuZrpWLxHHW1pxyf'
})

export const RANDOM_COLOR = atom({
    key : 'RANDOM COLOR',
    default : 'whatsapp'
})

export const selectGenre = atom({
    key : 'select genre',
    default : 'pop'
})
