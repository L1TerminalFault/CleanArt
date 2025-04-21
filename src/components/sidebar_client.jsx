"use client"
import { FaShoppingCart, FaCommentDots, FaShoppingBag, FaFire } from "react-icons/fa"
import { IoMdInformationCircle } from 'react-icons/io'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function ({ each }) {
  const pathname = usePathname()

  return (
    <Link href={each.link}>
      <div className={`opacity-0 sidebar-${each.icon} ${pathname.includes(each.link) ? 'bg-gray-700 border-gray-500' : 'md:bg-gray-800 border-gray-700'} hover:border-gray-500 hover:bg-gray-700 focus:bg-gray-700 md:border items-center md:gap-3 gap-1 rounded-3xl flex md:flex-row flex-col transition-all md:px-6 md:py-3 px-4 py-2`}>
        {
          each.icon === 1 ? <FaFire color="white" className="md:size-6 size-4" />
          : each.icon === 2 ? <FaShoppingBag color="white" className="md:size-6 size-4" />
          : each.icon === 3 ? <FaCommentDots color="white" className="md:size-6 size-4" />
          : each.icon === 4 ? <FaShoppingCart color="white" className="md:size-6 size-4" />
          : each.icon === 5 ? <IoMdInformationCircle color="white" className="md:size-6 size-4" />
          : ''
        }
        <div className="md:text-xl text-xs md:font-semibold text-white">{each.name}</div>
      </div>
    </Link>
  )
}