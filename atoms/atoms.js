import {atom} from "recoil";

export const SPOTIFY_TRACKS_ID_ATOM = atom({
    key : 'SPOTIFY TRACKS ID',
    default : undefined
})


export const selectGenre = atom({
    key : 'select genre',
    default : 'pop'
})

export const HAMBURGER_MENU = atom({
    key : "hamburger",
    default : false
})