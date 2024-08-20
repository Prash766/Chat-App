import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { useRecoilValue } from 'recoil'
import { Username } from '@/atoms/formAtom'

const JoinMessage = () => {
  const username  = useRecoilValue(Username)
  return (
    <Card className="max-w-md mx-auto rounded-2xl bg-background text-foreground">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="rounded-full bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center">
          🎉
        </div>
        <div>
          <p className="text-sm font-medium">{`Welcome to Room 1, ${username}!`}</p>
          <p className="text-xs text-muted-foreground">You have joined the chat.</p>
        </div>
      </CardContent>
    </Card>
  )
}


export default JoinMessage