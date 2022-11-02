import {atom} from "recoil";

export const CURRENT_TRACK_ID_STATE = atom({
    key : 'current track id state',
    default : null
})

export const IS_PLAYING_SONG = atom({
    key : 'is playing song',
    default : false
})

export const IS_UPDATE = atom({
    key : 'is update current play',
    default : 0
})