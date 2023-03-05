import {css} from '@emotion/css'

export const pagination  = css
`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`


export const page  = css
`
  display: flex;
  width: 1rem;
  height: 1rem;
  background: #333333;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  margin: 0 .1rem;
`


export const pageLink  = css
`
  cursor: pointer;
  color: #b0b0b0;
  border-radius: 100px;
  font-weight: lighter;
  font-size: 12px;
`


export const active  = css
    `
      background: #ad1457!important;
      color: #fff;
      border: none;
      font-weight: bolder;
    `


export const previous = css`
display: none;
`
export const next = css`
display: none;
`

export const breakClassName = css`
display: none;
`
export const breakLinkClassName = css`
display: none;
`