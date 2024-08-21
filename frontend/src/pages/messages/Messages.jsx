
import React, { useEffect, useRef } from 'react';
import { useSocket } from '@/atoms/Socket';
import { useRecoilState } from 'recoil';
import { Messages_Chat } from '@/atoms/Messages';
import OtherUser from './OtherUser';
import Me from './Me';
import { RoomId, Username } from '@/atoms/formAtom';
import { toast } from 'sonner';
import { PageNo } from '@/atoms/Page';
import axios from 'axios';
import { hasMoreMessages } from '@/atoms/hasMore';
import { EnteredChat } from '@/atoms/hasReloaded';

const Messages = () => {
    const socket = useSocket();
    const [messages, setMessages] = useRecoilState(Messages_Chat);
    const [roomId, setRoomId] = useRecoilState(RoomId);
    const [username, setUsername] = useRecoilState(Username);
    const chatRef = useRef(null);
    const [hasMore , setHasMore]  = useRecoilState(hasMoreMessages);
    const [pageNo, setPageNo] = useRecoilState(PageNo);
    const [hasEntered , setHasEntered]  = useRecoilState(EnteredChat)

    useEffect(() => {
        fetchMessages();
        setHasEntered(true)
    }, []);

    const fetchMessages = async () => {
        const storedRoomId = localStorage.getItem('roomId');
        if (!hasMore) return;

        try {


            const res = await axios.get(`http://localhost:4000/getMessages?roomId=${storedRoomId}&page=${pageNo}`);
            if (res.data.roomMessages.length) {
                setMessages(prev => [...res.data.roomMessages.reverse(), ...prev]);
                setPageNo(prev => prev + 1);
                setTimeout(() => {
                    chatRef.current.scrollTop = chatRef.current.scrollHeight;
                }, 0);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    const handleScroll = () => {
        if (chatRef.current.scrollTop === 0 && hasMore) {
            fetchMessages();
        }
    };


    useEffect(() => {
        chatRef.current.addEventListener('scroll', handleScroll);
        return () => chatRef.current.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
       
    }, [messages]);

    function handleTime(time) {
        const date = new Date(time);
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };

        return date.toLocaleString('en-IN', options);
    }

    useEffect(() => {
        if (!socket) return;

        const storedUsername = localStorage.getItem('username');
        const storedRoomId = localStorage.getItem('roomId');

        if (storedUsername && storedRoomId) {
            setUsername(storedUsername);
            setRoomId(storedRoomId);
            socket.emit('join_room', { username: storedUsername, roomId: storedRoomId });
        }

        socket.on('recieve_message', (data) => {
            setMessages(prev => [...prev, {
                message: data.messageContent,
                username: data.username,
                __createdtime__: data.__createdtime__
            }]);

            if (data.username === 'ChatBot' && !hasEntered) {
                toast.success(`Welcome to ${storedRoomId} ${storedUsername}`);
            }
        });

        return () => {
            socket.off('recieve_message');
        };
    }, [socket, setMessages, setUsername, setRoomId]);

    return (
        <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => {
                if(message.username==='ChatBot' && !hasEntered){
                    return <OtherUser time={handleTime(message.__createdtime__)} username={message.username} key={index} message={message.message} />;
                }
                if (message.username !== username) {
                    return <OtherUser time={handleTime(message.__createdtime__)} username={message.username} key={index} message={message.message} />;
                } else {
                    return <Me time={handleTime(message.__createdtime__)} key={index} message={message.message} />;
                }
            })}
        </div>
    );
};

export default Messages;

