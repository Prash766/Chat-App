import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Textarea } from "@/components/ui/textarea"
import Messages from "./messages/Messages"
import { useRecoilState, useRecoilValue } from "recoil"
import { sendingMessage } from "@/atoms/Messages"
import { useSocket } from "@/atoms/Socket"
import { RoomId, Username } from "@/atoms/formAtom"
import ChatMembers from "./ChatMembers"

export default function Chat() {
  const [messageContent , setMessageContent] = useRecoilState(sendingMessage)
  const username = useRecoilValue(Username)
  const roomId = useRecoilValue(RoomId)
  const socket = useSocket()
  const navigate = useNavigate()

  function handleClick(){
    if(messageContent!==""){
      const __createdtime__ = Date.now()
      socket.emit('send_message' ,{messageContent,username , roomId,__createdtime__ })
    }
    setMessageContent('')
  }

  function handleLeave(){
    const __createdtime__= Date.now()

    if(socket){
      socket.emit('leave_room' , {
        username : localStorage.getItem('username'),
        roomId: localStorage.getItem('roomId'),
        __createdtime__

      })
      navigate('/', {replace:true})
    }


  }



  return (
    <div className="flex h-screen  w-full  bg-[#0d1117] text-white">
      <div className="border-r overflow-auto border-[#30363d] w-[300px] p-4">
        <div className="flex items-center justify-between mb-4 ">
          <h2 className=" text-lg font-medium">Room Members</h2>
       
        </div>

        <div className="space-y-5 pt-2 ">
          <ChatMembers/>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="border-b border-[#30363d] p-6 flex items-center justify-between">
          <h2 className="text-lg font-medium">{roomId}</h2>
          <Button onClick={handleLeave}>Leave</Button>
        </div>
    <>
    </>
    <Messages/>

        <div className="border-t border-[#30363d] p-4 flex items-center gap-2">
          <Textarea
          value={messageContent}
          onChange={(e)=>setMessageContent(e.target.value)}
            placeholder="Type your message..."
            className="bg-[#21262d] border-[#30363d] text-white placeholder:text-[#8b949e] resize-none h-[80px] flex-1 overflow-y-auto"
          />
          <Button onClick={handleClick} size="icon" className="rounded-full">
            <SendIcon className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  )
}


function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


