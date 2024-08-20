import React, { useEffect } from 'react';
import { useSocket } from '@/atoms/Socket';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Messages_Chat } from '@/atoms/Messages'; 
import OtherUser from './OtherUser';
import Me from './Me';
import { RoomId, Username } from '@/atoms/formAtom';
import JoinMessage from './JoinMessage';
import { toast } from 'sonner';

const Messages = () => {
    const socket = useSocket();
    const [messages, setMessage] = useRecoilState(Messages_Chat);
    const [roomId, setRoomId] = useRecoilState(RoomId);
    const [username, setUsername] = useRecoilState(Username);


    useEffect(() => {
        if (!socket) return;
        const storedUsername = localStorage.getItem('username');
        const storedRoomId = localStorage.getItem('roomId');


        if (storedUsername && storedRoomId) {
            setUsername(storedUsername);
            setRoomId(storedRoomId);
            console.log(username)
              console.log(roomId)
            socket.emit('join_room', { username: storedUsername, roomId: storedRoomId });
        }

    
        socket.on('recieve_message', (data) => {
            console.log(data);
            setMessage(prev => [...prev, {
                message: data.messageContent,
                username: data.username,
                __createdtime__: data.__createdtime__
            }]);

        if(data.username==='ChatBot'){
            toast.success(`Welcome to ${storedRoomId} ${storedUsername}`)
        }

        });

        return () => {
            socket.off('recieve_message');
        };
    }, [socket]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => {
                if (message.username === 'ChatBot') {
                 
                } else if (message.username !== username) {
                    return <OtherUser username={message.username} key={index} message={message.message} />;
                } else {
                    return <Me key={index} message={message.message} />;
                }
            })}
        </div>
    );
};

export default Messages;
