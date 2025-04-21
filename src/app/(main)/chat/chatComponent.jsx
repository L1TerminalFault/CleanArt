'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FaCommentDots } from 'react-icons/fa'


export default function ({ adminId, admin, selectedUserId, currentUserId, currentUserImage, selectedUserImage, chatsFiltered: chats }) {
  const [chatsFiltered, setChatsFiltered] = useState(chats)

  const messagesEndRef = useRef(null)

  const [scrollDelay, setScrollDelay] = useState(true)

  useEffect(() => {
    if (scrollDelay) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 1000)
      setScrollDelay(false)
    } else messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatsFiltered])

  const handleSend = async (formData) => {
    const message = formData.get('message')

    const res = await fetch('/api/sendChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: currentUserId,
        reciever: (!admin ? adminId : selectedUserId),
        message
      })
    })

    const chat = await (await fetch('/api/fetchChats')).json()
    setChatsFiltered(chat)

  }

  return (
    <div className={`flex md:p-3 flex-col ${admin ? 'md:h-[calc(100%-120px)] h-[calc(100%-120px)]' : 'md:h-[calc(100%-0px)] h-[calc(100%-40px)]'} overflow-scroll justify-end`}>
      {chatsFiltered.length ?
        <div className="text-sm md:text-lg text-white flex px-3 flex-col gap-1 overflow-scroll">
          <div className="py-3 h-full"></div>
          {
            chatsFiltered.map(eachChat => (
              <div key={eachChat._id}>
                {eachChat.sender === currentUserId ? <Right image={currentUserImage} message={eachChat.message} /> : <Left image={selectedUserImage} message={eachChat.message} />}              </div>
            ))
          }
          <div ref={messagesEndRef}></div>
        </div>
        : <div className='flex flex-col gap-2 h-full items-center justify-center text-xl text-gray-400'>
          <FaCommentDots size={45} />
          No Chats
        </div>
      }


      <div className="flex py-1 md:py-2 px-3 md:px-6">
        <form action={handleSend} className='w-full'>
          <input
            type="text"
            name='message'
            className="text-white focus:outline-2 outline-none focus:outline-gray-600 bg-transparent border-2 border-gray-600 px-5 py-1 md:px-6 md:py-2 text-xl flex-1 w-full rounded-3xl"
            placeholder="Type message"
          />
        </form>
      </div>
    </div>
  )
}



const Right = ({ message, image }) => (
  <div className="flex flex-row justify-end">

    <div className=" flex items-end flex-col">
      <div className="bg-gray-600 max-w-[300px] md:max-w-[400px] mr-6 p-2 px-6 rounded-3xl w-max">
        {message}
      </div>
      <div className="bg-gray-600 p-2 mr-3 w-max rounded-full"></div>
      <div className="bg-gray-600 rounded-full p-1 w-max"></div>
    </div>

    <div>
      <div className="p-1 bg-gray-600 rounded-full">
        <div className="size-9 rounded-full flex items-center justify-center overflow-hidden">
          <Image src={image} alt='' width={36} height={36} className='' />
        </div>
      </div>
    </div>

  </div>
)

const Left = ({ message, image }) => (
  <div className='flex flex-row'>

    <div>
      <div className="p-1 bg-gray-600 rounded-full">
        <div className="size-9 rounded-full flex items-center justify-center overflow-hidden">
          <Image src={image} alt='' width={36} height={36} className='' />
        </div>
      </div>
    </div>

    <div className="">
      <div className="bg-gray-600 max-w-[300px] md:max-w-[400px] ml-6 p-2 px-6 rounded-3xl w-max">
        {message}
      </div>
      <div className="bg-gray-600 p-2 ml-3 w-max rounded-full"></div>
      <div className="bg-gray-600 rounded-full p-1 w-max"></div>
    </div>

  </div>
)