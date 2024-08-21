import {atom} from "recoil"

export const socketMessage= atom({
    key:"socketMessageAtom",
    default:false
})

export const backendMessage= atom({
    key:"socketMessageAtom",
    default:true
})