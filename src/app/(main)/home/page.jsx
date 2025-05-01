import Image from "next/image"
import Link from 'next/link'
import { FaArrowRight } from "react-icons/fa"

import Setter from  './setLocalStorage'

import img_add from '@/../public/k.jpg'
import img_deal from '@/../public/u.jpg'
import icon_portrait from '@/../public/hj.jpg'
import icon_modern from '@/../public/m.jpeg'
import icon_abstract from '@/../public/v.jpg'
import icon_landscape from '@/../public/ac.jpeg'
import img_1 from '@/../public/ab.jpg'
import img_2 from '@/../public/d.jpeg'
import img_3 from '@/../public/j.jpeg'
import img_4 from '@/../public/sd.jpg'




const Pallete = ({ image, title, id }) => (
  <div className="relative p-2 md:w-96 w-56 bg-gradient-t from-black to-[#000] border-0 border-gray-600 transition-all hover:border-gray-600 rounded-3xl">
    <div className="rounded-3xl overflow-hidden">
      <Image src={image} alt="" className="md:size-96 size-52" />
    </div>
    <div className="mt-3 p-2 bottom-3 left-0 absolute mx-3 flex items-center flex-col rounded-3xl bg-gradient-to-t from-gray-800 to-[#0000">
      <div className="font-semibold text-white md:text-lg">{title}</div>
      <Link href={`/products`}>
        <div className="bg-[#e2b40e] transition-all hover:bg-yellow-400 px-5 py-1 rounded-full">View Details</div>
      </Link>
    </div>
  </div>
)


export default function () {
  let counter = 0

  return (
    <div className="p-3 md:p-4 gap-3 md:gap-4 flex flex-col md:h-[calc(100vh-20px)] h-[calc(100vh-10px)] overflow-scroll">
      <div className="text-lg text-gray-300 pt-3 pl-6 md:pl-12">Explore By Category</div>

      <Setter />

      <div className="flex items-center justify-evenly">
        <Link href={'/products'}>
          <div className="sidebar-2 py-2 px-5 rounded-xl transition-all hover:bg-gray-800 border-2 border-[#0000] opacity-0 flex gap-2 flex-col items-center rounded-3x">
            <div className="flex items-center justify-center overflow-hidden rounded-full">
              <Image src={icon_portrait} className="size-12 md:size-20" alt="" />
            </div>
            <div className="text-white text-xs" >Portrait</div>
          </div>
        </Link>
        <Link href={'/products'}>
          <div className="sidebar-3 py-2 px-5 rounded-xl transition-all hover:bg-gray-800 border-2 border-[#0000] opacity-0 flex gap-2 flex-col items-center rounded-3x">
          <div className="flex items-center justify-center overflow-hidden rounded-full">
            <Image src={icon_landscape} className="size-12 md:size-20" alt="" />
          </div>
          <div className="text-white text-xs" >Landscape</div>
        </div>
        </Link>
        <Link href={'/products'}>
           <div className="sidebar-4 py-2 px-5 rounded-xl transition-all hover:bg-gray-800 border-2 border-[#0000] opacity-0 flex gap-2 flex-col items-center rounded-3x">
          <div className="flex items-center justify-center overflow-hidden rounded-full">
            <Image src={icon_abstract} className="size-12 md:size-20" alt="" />
          </div>
          <div className="text-white text-xs" >Abstract</div>
        </div>
        </Link>
        <Link href={'/products'}>
          <div className="sidebar-5 py-2 px-5 rounded-xl transition-all hover:bg-gray-800 border-2 border-[#0000] opacity-0 flex gap-2 flex-col items-center rounded-3x">
          <div className="flex items-center justify-center overflow-hidden rounded-full">
            <Image src={icon_modern} className="size-12 md:size-20" alt="" />
          </div>
          <div className="text-white text-xs" >Modern</div>
        </div>
        </Link>
        
      </div>

      <div className="h2-animation justify-center flex items-center">
        <div className="">
          <div className="text-2xl md:text-4xl font-bold text-white pl-12 p-6">Deals And Offers</div>
          <div className=" bg-gradient-to-r from-gray-600 via-[#0000] to-[#0000] flex border-0 border-gray-600 overflow-hidden rounded-3xl flex-row mt-3 md:mt-6">
            <div className="md:py-16 py-10 rounded-3xl p-1 pl-2 flex-1 flex flex-col items-center justify-center">
              <div className="text-white font-semibold flex text-center text-2xl md:text-3xl lg:text-5xl max-w-72">
                This is the currently going deal
              </div>
              <div className="text-sm md:text-md max-w-40 md:max-w-60 mt-8 text-gray-300 flex text-center ">
                You can put your deals and offers in this section so that customers stay updated
              </div>
            </div>
            <div className="p-9 bg-gradient-to-l from-white to-[#fff0]"></div>
            <div className="flex-1 flex items-center justify-center bg-white">
              <Image
                src={img_deal}
                alt=""
                className=""
              />
            </div>
          </div>
        </div>
      </div>

      {/** Top Selling */}
      <div className="mt-8">
        <div className="pl-12 text-2xl font-semibold text-white md:text-4xl">Top Selling</div>
        <div className="flex py-3 px-12 items-center justify-between">
          <div className="text-gray-400">Explore Highest Bids</div>
          <Link href={'/products'}>
            <div className="p-2 transition-all hover:bg-gray-600 rounded-full">
              <FaArrowRight color="white" size={15} />
            </div>
          </Link>
        </div>

        <div className="flex mt-3 overflow-scroll md:w-[calc(100vw-270px)]">
          <div className="flex flex-row gap-2">
            <Pallete image={img_1} title={'Sunset'} id={'1'} />
            <Pallete image={img_2} title={'Abstract'} id={'1'} />
            <Pallete image={img_3} title={'Girl'} id={'1'} />
            <Pallete image={img_4} title={'Sunset'} id={'1'}/>
          </div>
        </div>

      </div>

      {/** Advertisements */}
      <div className="h2-animation md:mb-0 mb-20 justify-center flex items-center">
        <div className="">
          <div className="text-2xl md:text-4xl font-bold text-white pl-12 p-6">Advertisements</div>
          <div className=" bg-gradient-to-r from-gray-600 via-[#0000] to-[#0000] flex border-0 border-gray-600 overflow-hidden rounded-3xl flex-row mt-3 md:mt-6">
            <div className="md:py-16 py-10 rounded-3xl p-1 pl-2 flex-1 flex flex-col items-center justify-center">
              <div className=" text-white font-semibold flex text-center text-2xl md:text-3xl lg:text-5xl max-w-72">
                This is the adds section
              </div>
              <div className="text-sm md:text-md max-w-40 md:max-w-60 mt-8 text-gray-300 flex text-center ">
                You can put addvertisement related stuffs here
              </div>
            </div>
            <div className="p-9 bg-gradient-to-l from-white to-[#fff0]"></div>
            <div className="flex-1 flex items-center justify-center bg-white">
              <Image
                src={img_add}
                alt=""
                className=""
              />
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
