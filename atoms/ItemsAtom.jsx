import {atom} from "recoil";

export const NEW_RELEASES_ALBUMS_ATOM = atom({
    key : 'NEW RELEASES' + Math.random() ,
    default : []
})

export const NEW_RELEASES_ALBUMS_TRACK_ATOM = atom({
    key : 'NEW RELEASES ALBUMS TRACK' + Math.random(),
    default : []
})

export const TRACK_FOR_WEB_PLAY_BACK = atom({
    key : 'TRACK FOR WEB PLAY BACK',
    default : ''
})

export const SPOTIFY_DEVICE_ID_ATOM = atom({
    key : 'TRACK FOR WEB PLAY BACK',
    default : undefined
})