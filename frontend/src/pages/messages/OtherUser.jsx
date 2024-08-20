import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useRecoilValue } from 'recoil'
import { Username } from '@/atoms/formAtom'


const OtherUser = ({message , username}) => {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="w-8 h-8 border border-[#30363d]">
        <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="bg-[#30363d] rounded-lg p-3 max-w-[70%]">
        <p className="font-medium">{username}</p>
        <p className="text-sm">{message}</p>
        <div className="text-xs text-[#8b949e] mt-1 text-right">2:30 PM</div>
      </div>
    </div>
    
  )
}

export default OtherUser