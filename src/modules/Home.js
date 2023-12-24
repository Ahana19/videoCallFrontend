import React, { useEffect, useState,useCallback } from "react"
import {useLocation,useNavigate} from 'react-router-dom'
import {useSocket} from '../socketContext'

const Home = () => {
	const location=useLocation()
	const nav=useNavigate()
	const socket=useSocket()
    const [roomNo,setRoomNo] = useState('')
	const [email,setEmail]=useState('')

	useEffect(()=>{
		setEmail(location.state?.myEmail||'')
	},[location.state])

	const joinRoom=useCallback((e)=>{
		e.preventDefault()
		socket.emit('join_room',{roomNo,email})
	},[roomNo,email,socket])

	const handleJoin=useCallback((data)=>{
		// const {room,email}=data
		nav(`/room/${data.roomNo}`)
	},[nav])

	useEffect(()=>{
		socket.on('join_room', handleJoin)
		return()=>{
			socket.off('join_room',handleJoin)
		}
	},[socket])
	  
  return (
	<div className='bg-yellow'>
		<div className='p-2'>
			<p onClick={()=>{
				nav('/profile',{state:{myEmail:email}})
			}}>profile</p>
		</div>
		<div className='flex justify-evenly items-center h-screen'>
		<div className='bg-red w-50 p-7 shadow-lg rounded-md '>
			<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h3>{location.state.myEmail}</h3>
			</div>
		</div>
		<div className='bg-red w-96 p-6 shadow-lg rounded-md'>
			<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
				<form className='flex flex-col' onSubmit={joinRoom}>
					<input 
					type='text'
					placeholder='Enter code' 
					value={roomNo}
					onChange={(e)=>{setRoomNo(e.target.value)}} 
					className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 mt-3'/>
            		<button
					className='border-2 border-indigo-700 bg-blue text-white mt-3 py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold'>
						Create or Join Room</button>
				</form>
        	</div>
      	</div>
  	</div>
	</div>
	
  )
}

export default Home
