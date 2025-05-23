"use client"

import Image from "next/image"
import Link from 'next/link'

import images from '@/_imagesImport'
import { IoMdAdd } from "react-icons/io"

const categories = [
  'landscape',
  'portrait',
  'abstract',
  'modern'
]

const Pallete = ({ image, title, price, delivery }) => (
  <div className="relative p-2 bg-gradient-t from-black to-[#000] border-0 border-gray-600 transition-all hover:border-gray-600 rounded-3xl">
    <div className="rounded-3xl overflow-hidden">
      <Image 
        src={image.includes('http') ? image : images['img_' + image] } 
        alt="" 
        width={100}
        height={100}
        className="rounded-3xl md:size-80 size-40" 
      />
    </div>
    <div className="mt-3 p-2 md:gap-1 bottom-3 left-0 absolute mx-3 flex flex-col rounded-xl bg-gradient-to-t from-gray-800 via-gray-700 to-[#1f293766]">
      <div className=" text-white text-sm md:text-lg">{title}</div>
      <div className="text-lg md:text-2xl text-white font-bold">{price}</div>
      <div className="text-gray-300 text-xs md:text-sm mb-1">{delivery}</div>
      <div className="bg-[#e2b40e] md:text-sm text-xs transition-all hover:bg-yellow-400 px-5 py-1 rounded-full">View Details</div>
    </div>
  </div>
)


const Category = ({ category, children }) => (
  <div className="flex flex-col">
    <div className="text-lg mb-3 mt-4 text-white font-semibold pl-12">{category[0].toUpperCase() + category.slice(1)}</div>
    <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-2">
      {children}
    </div>
  </div>
)

export default function ({ admin, products }) {

  return (
    <div className="flex flex-col overflow-scroll w-full p-3 md:p-7 pb-24 md:pb-0 md:h-[calc(100vh-150px)] h-[calc(100vh-120px)] gap-3 md:gap-7">
      {admin 
      ? <Link className="p-1 border border-gray-600 bg-black active:bg-gray-800 rounded-full absolute top-[14px] md:top-8 right-2 md:right-6" href={'/addProduct'}>
        <IoMdAdd color="white" className="size-5 md:size-8" />
      </Link>
      : null
      }
    
      {
        categories.map(each => (
          <Category key={each} category={each} >
            {
              products.filter(eachProduct => eachProduct.category === each).map(eachItem => (
                <Link href={`/products/${eachItem._id}`} key={eachItem._id}>
                  <Pallete 
                    image={eachItem.image} 
                    title={eachItem.title} 
                    price={eachItem.price} 
                    delivery={eachItem.time} 
                  />
                  </Link>
              ))
            }
            
            
          </Category>
        ))
      }
    </div>
  )
}
