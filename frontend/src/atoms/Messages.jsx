import {atom} from "recoil"

export const Messages_Chat = atom({
    key:"messageAtom",
    default:[]
})



export  const sendingMessage  = atom({
    key:"sendingMessageAtom",
    default:""
})
