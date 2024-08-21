import {atom} from "recoil"

export const PageNo = atom({
    key:"PageAtom",
    default:0
})

export const totalPage = atom({
    key:"TotalPageAtom",
    default:1
})