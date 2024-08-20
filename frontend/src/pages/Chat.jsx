import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import Messages from "./messages/Messages"
import { useRecoilState, useRecoilValue } from "recoil"
import { sendingMessage } from "@/atoms/Messages"
import { useSocket } from "@/atoms/Socket"
import { RoomId, Username } from "@/atoms/formAtom"

export default function Chat() {
  const [messageContent , setMessageContent] = useRecoilState(sendingMessage)
  const username = useRecoilValue(Username)
  const roomId = useRecoilValue(RoomId)
  const socket = useSocket()

  function handleClick(){
    if(messageContent!==""){
      const __createdtime__ = Date.now()
      socket.emit('send_message' ,{messageContent,username , roomId,__createdtime__ })
    }
    setMessageContent('')
  }
  return (
    <div className="flex h-screen  w-full bg-[#0d1117] text-white">
      <div className="border-r border-[#30363d] w-[300px] p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Chats</h2>

        </div>
        <Input
          placeholder="Search chats"
          className="bg-[#21262d] border-[#30363d] text-white placeholder:text-[#8b949e] mb-4"
        />
        <div className="space-y-5">
          <Link to="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-[#30363d]">
            <Avatar className="w-10 h-10 border border-[#30363d]">
              <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-[#8b949e] truncate">Hey, how's it going?</p>
            </div>
            <div className="text-sm text-[#8b949e]">2:30 PM</div>
          </Link>
          <Link to="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-[#30363d]">
            <Avatar className="w-10 h-10 border border-[#30363d]">
              <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="font-medium">Jane Smith</p>
              <p className="text-sm text-[#8b949e] truncate">Did you see the new update?</p>
            </div>
            <div className="text-sm text-[#8b949e]">11:45 AM</div>
          </Link>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="border-b border-[#30363d] p-6 flex items-center justify-between">
          <h2 className="text-lg font-medium">Chat with John Doe</h2>
         
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


