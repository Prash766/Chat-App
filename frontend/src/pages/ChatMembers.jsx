import { listOfMembers } from '@/atoms/ChatMembers'
import { useSocket } from '@/atoms/Socket'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const ChatMembers = () => {
    const [memberList, setMemberList] = useRecoilState(listOfMembers)
    const socket = useSocket()

    useEffect(() => {
        if (!socket) return 
        socket.on("chatroom_users", (data) => {
            console.log(data)
            setMemberList(() => {
                const usernamesSet = new Set(data.map(user => user.username))
                return [...usernamesSet]
            })
        })

    }, [socket , memberList])

    return (
        <>
            {
                memberList.length !== 0 ? memberList.map((person, index) => 
                    <Member key={index} username={person} />
                ) : null
            }
        </>
    )
}

const Member = ({ username }) => {
    return (
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#30363d]">
            <Avatar className="w-10 h-10 border border-[#30363d]">
                <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
                <p className="font-medium">{username}</p>
            </div>
        </div>
    )
}

export default ChatMembers
