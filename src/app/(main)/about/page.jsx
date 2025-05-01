import Link from 'next/link'
import Image from 'next/image'

import telegram from '@/../public/telegram.png'
import instagram from '@/../public/instagram.png'
import whatsapp from '@/../public/whatsapp.png'


export default function () {
  return (
    <div className="pb-16 md:pb-0 h-[calc(100vh-10px)] md:h-[calc(100vh-20px)] overflow-scroll">
      <div className="p-5 w-full flex gap-6  md:flex-row flex-col">
        <div className="h2-animation md:self-auto self-center size-52 md:size-64 lg:size-80 xl:size-96 2xl:size-[500px] bg-gray-700 border-2 border-gray-600 rounded-full">

        </div>
        <div className="sidebar-3 opacity-0 p-9 bg flex-1 border-2 border-gray-700 rounded-3xl bg-black">
          <div className="text-xl font-semibold text-white">About the Artist</div>
          <div className=" text-white">Hi! I am Yafet, experienced Painter for over 20 yrs, I am guaranteed to provide cutting edge art designs, I am also a developer </div>
        </div>
      </div>
      <div className="text-xl text-gray-500 mt-6 text-center">Contact the Artist</div>
      <div className="p-3 flex overflow-scroll justify-center flex-row mt-1 gap-6">
        <Link href={''}>
          <div className="sidebar-3 opacity-0 bg-gray-700 rounded-full">
            <Image src={whatsapp} className='size-12' alt='' />
          </div>
        </Link>
        <Link href={'https://www.instagram.com/yafet.el'}>
          <div className="sidebar-4 opacity-0 bg-gray-700 rounded-full">
            <Image src={instagram} className='size-12' alt='' />
          </div>
        </Link>
        <Link href={'https://t.me/yafet44'}>
          <div className="sidebar-5 opacity-0 bg-gray-700 rounded-full">
            <Image src={telegram} className='size-12' alt='' />
          </div>
        </Link>
      </div>
    </div>
  )
}