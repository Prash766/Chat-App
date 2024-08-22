import React from 'react'
import { useRecoilState } from 'recoil'
import { RoomId, Username } from '../atoms/formAtom'
import { useSocket } from '../atoms/socket'
import { useNavigate } from 'react-router-dom'

const FormPage = () => {
    const [roomId, setRoomId] = useRecoilState(RoomId)
    const [username, setUserName] = useRecoilState(Username)
    const socket = useSocket()
    const navigate = useNavigate()

    function handleClick() {
        if (roomId !== "" && username !== "") {
            localStorage.setItem('username', username);
            localStorage.setItem('roomId', roomId);
    if(socket){

        socket.emit('join_room', { username, roomId });
        navigate('/chat', { replace: true });
    }
        }
    }
    

    return (
        <div className="w-full bg-red-800 h-screen overflow-hidden">
            <div className="bg-gradient-to-b from-blue-800 to-blue-600 h-80 sm:h-96 "></div>
            <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-8 mb-12">
                <div className="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-56 sm:-mt-72">
                    <p className="text-3xl font-bold leading-7 text-center text-white mb-8">JOIN ROOM</p>
                    <div className="space-y-8">
                        <div>
                            <label htmlFor="countries" className="block font-semibold leading-none text-gray-300 mb-2">Select Room</label>
                            <select 
                                value={roomId} 
                                onChange={(e) => setRoomId(e.target.value)} 
                                id="countries" 
                                className="bg-gray-800 border p-4 border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                            >
                                <option>Select Room</option>
                                <option value="room-1">Room 1</option>
                                <option value="room-2">Room 2</option>
                                <option value="room-3">Room 3</option>
                                <option value="room-4">Room 4</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold leading-none text-gray-300 mb-2">Username</label>
                            <input 
                                value={username} 
                                onChange={(e) => setUserName(e.target.value)} 
                                type="text" 
                                className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 border border-gray-600 bg-gray-800 rounded-lg w-full"
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center mt-20 sm:mt-32">
                        <button 
                            onClick={handleClick} 
                            className="font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none transition duration-300 ease-in-out"
                        >
                            JOIN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormPage
