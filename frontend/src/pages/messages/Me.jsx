import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"


const Me = ({message, time}) => {

  return (
    <div className="flex items-start gap-3 justify-end">
      <div className="bg-[#0369a1] rounded-lg p-3 max-w-[70%]">
        <p className="font-medium">You</p>
        <p className="text-sm">{message}</p>
        <div className="text-xs text-[#8b949e] mt-1 text-right">{time}</div>
      </div>
      <Avatar className="w-8 h-8 border border-[#30363d]">
        <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    </div>
    
  )
}

export default Me