"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

import ChatComponent from './chatComponent'


// currentUserId is the mongodb _id of the admin since this is the admin component
// and the selectedUser state is the mongodb _id of the currently selected client
export default function ({ currentUserImage, users, currentUserId }) {
  const [selectedUser, setSelectedUser] = useState(users[0])
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchChats = async () => {
    setLoading(true)
    const res = await (await fetch('/api/fetchChats')).json()
    setChats(res.filter(eachChat => ((eachChat.sender === selectedUser._id || eachChat.reciever === selectedUser._id))))
    setLoading(false)
  }

  useEffect(() => {
    fetchChats()
  }, [selectedUser])

  return (
    <div className="h-[calc(100vh-120px)] md:h-[calc(100vh-170px)] pb-12 md:pb-0">
      <div className="border-b-2 border-gray-600 p-3 md:p-4 flex flex-row gap-4">
        {users.length ?
          users.map(eachUser => (
            <div
              key={eachUser._id}
              onClick={() => {
                setSelectedUser(eachUser)
                fetchChats()
              }}
              className={`${selectedUser._id === eachUser._id ? 'bg-slate-600' : ''} flex flex-col items-center justify-center gap-1 p-2 rounded-2xl hover:bg-slate-600`}
            >
              
              <div className={`overflow-hidden rounded-full flex flex-col border-2 border-gray-500 size-12 md:size-16`}>
                <Image
                  src={eachUser.image}
                  alt=''
                  width={30} height={30}
                  className='size-24'
                />

              </div>
              <div className='text-white text-xs font-[10px] text-center md:text-base'>{eachUser.username}</div>
            </div>

          ))
          : <div className='text-lg text-gray-300 w-full flex items-center justify-center h-[calc(100vh-150px)]'>No Users</div>
          }
      </div>


      {selectedUser ?
        <ChatComponent
          selectedUserId={selectedUser._id}
          currentUserId={currentUserId}
          currentUserImage={currentUserImage}
          selectedUserImage={selectedUser.image}
          chatsFiltered={chats}
          admin
        />
        : null}
    </div>
  )
}



