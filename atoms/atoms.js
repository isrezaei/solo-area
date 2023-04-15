import {atom} from "recoil";

export const SPOTIFY_TRACKS_ID_ATOM = atom({
    key : Math.random().toString(),
    default : undefined
})


export const selectGenre = atom({
    key : Math.random().toString(),
    default : 'pop'
})

export const HAMBURGER_MENU = atom({
    key : Math.random().toString(),
    default : false
})