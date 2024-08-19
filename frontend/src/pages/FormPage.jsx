import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { RoomId, Username } from '../atoms/formAtom'
import { useSocket } from '../atoms/socket'
import { useNavigate } from 'react-router-dom'

const FormPage = () => {
    const [roomId , setRoomId] = useRecoilState(RoomId)
    const [username, setUserName] = useRecoilState(Username)
    const socket = useSocket()
    const navigate = useNavigate()

    function handleClick(){
        if(roomId!=="" && username !== ""){
        socket.emit('join_room' ,{username , roomId})
        }
        navigate('/chat' ,{replace:true})
    }


    return (
        <div className="w-full bg-gray-800 h-screen">
            <div className="bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
            <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
                <div className="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-72">
                    <p className="text-3xl font-bold leading-7 text-center text-white">JOIN ROOM</p>
                    <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-12">
                        <select value={roomId} onChange={(e)=>setRoomId(e.target.value)} id="countries" className="bg-gray-50 border p-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Select Room</option>
                            <option value="room-1">Room 1</option>
                            <option value="room-2">Room 2</option>
                            <option value="room-3">Room 3</option>
                            <option value="room-4">Room 4</option>
                        </select>
                    </div>
                    <div className="md:flex items-center mt-12">
                        <div className="w-full md:w-1/2 flex flex-col">
                            <label className="font-semibold leading-none text-gray-300">Username</label>
                            <input value={username} onChange={(e)=>setUserName(e.target.value)} type="text" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" />
                        </div>
                    </div>


                    <div className="flex items-center mt-28 justify-center w-full">
                        <button onClick={handleClick} className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                            JOIN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormPage