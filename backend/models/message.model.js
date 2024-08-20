import mongoose ,{Schema} from "mongoose";

const messageSchema = new Schema({
    message:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    roomID:{
        type:String,
        required:true,

    },
    __createdtime__:{
        type:Number,
        required:true
    }
}, {timestamps:true})

export const ChatMessage = mongoose.model("message" , messageSchema)