import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link'

// import icons from hugeicons.com
// import icons from hugeicons


import img_hero from '@/../public/l.jpeg'
import img_cat1 from '@/../public/hj.jpg'
import img_cat2 from '@/../public/ac.jpeg'
import img_cat3 from '@/../public/v.jpg'
import img_cat4 from '@/../public/ad.jpg'
import img_deal from '@/../public/ad.jpeg'
import telegram from '@/../public/telegram.png'
import instagram from '@/../public/instagram.png'
import whatsapp from '@/../public/whatsapp.png'



export default function Home() {
  let counter = 0

  return (

    <div className="">
      {/* Hero Section */}
      <div className="section p-2 md:px-6 pt-0 rounded-3xl relative flex flex-col items-stretch justify-stretch text-white">
        <div className="overflow-hidden rounded-3xl relative flex-col items-center justify-center flex">
          <div className="absolute gap-14 grid grid-cols-2">
            <div className="hero-background p-20 translate-y-32 bg-purple-800 rounded-[100px]" />
            <div className="spin p-16 md:p-32 bg-purple-600 rounded-3xl" />
          </div>



          <div className=" max-w-[1400px] w-full items-stretch">
            <div className="rounded-3xl bg-gradient-to-l from-[#fff7] via-[#fff0] to-[#fff0] items-center justify-center p-2 md:p-20 gap-1 flex flex-row self-stretch border-gray-600 backdrop-blur-xl py-10 md:py-32 mt-16">
              <div className="pr-4 md:gap-8 gap-3 text-center flex items-center justify-center flex-col">
                <div className="text-xl md:text-5xl h2-animation font-bold max-w-40 md:max-w-[700px]">Discover and Collect Artworks to Elevate Your Space</div>
                <p className="text-[10px] md:text-sm text-gray-400 max-w-40 md:max-w-80">Explore curated collection of original art designed to spark inspiration to any space.</p>
                <Link href='/home'>
                  <div className="hero-section-button hover:border-gray-500 transition-all hero-section-button bg-gradient-to-l m-3 from-purple-600 via-[#aa55dd44] to-[#0000] flex flex-row py-2 px-7 rounded-3xl">
                    <div className="text-sm md:text-lg text-[#ffffff] font-semibold">
                        <div className="text-nowrap">Explore Beauty</div>
                    </div>
                    <div className="flex items-center justify-center ml-3">
                      <FaArrowRight size={20} color="#000" />
                    </div>
                  </div>
                </Link>
              </div>


              <div className="hero-image overflow-hidden rounded-3xl">
                <Image
                  src={img_hero}
                  color="green"
                  alt="Laptops on Sale"
                  className="md:width-96 width-52"
                />

              </div>
            </div>


          </div>
        </div>
      </div>


      {/* Art Categories */}
      <div className="section-reverse md:mt-14 mt-9 max-w-[1400px] w-full px-3 md:px-6 mx-auto">
        <div className="text-2xl md:text-4xl text-white font-bold pl-10">Art Categories</div>
        <div className="flex py-3 px-10 items-center justify-between">
          <div className="text-gray-400">Explore By Categories</div>
          <Link href={'/products'}>
            <div className="p-2 transition-all hover:bg-gray-600 rounded-full">
              <FaArrowRight color="white" size={15} />
            </div>
          </Link>

        </div>
        <div className=" grid grid-flow-col overflow-scroll gap-4">
          {[
            { name: "Portrait", img: img_cat1, price: "$37,999 per sqm" },
            { name: "Landscape", img: img_cat2, price: "$28,699 per sqm" },
            { name: "Abstract", img: img_cat3, price: "$20,199 per sqm" },
            { name: "Modern", img: img_cat4, price: "$17,999 per sqm" },
          ].map((product) => {
            counter = counter + 1;
            return (
              <Link key={product.name} href={'/products'}>
                <div className={`opacity-0 categories-${counter} pb-2 w-52 md:w-96 bg-gradient-to-t from-gray-700 via-gray-800 to-[#fff0] shadow-md rounded-3xl text-center`}>
                  <div className="overflow-hidden rounded-3xl m-2">
                    <Image
                      src={product.img}
                      alt={product.name}
                      className="md:size-96 size-52 rounded-md" />
                  </div>
                  <div className="md:text-xl text-white font-semibold mt-1">{product.name}</div>
                  <p className="md:text-md text-xs text-gray-200">{product.price}</p>

                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Deals and Offers */}
      <Link href={'/home'}>
        <div className="section w-full justify-center mt-3 md:mt-6 flex items-center">
          <div className="w-[1400px]">
            <div className="pt-6 pl-12 text-2xl md:text-4xl font-bold text-white">Deals And Offers</div>
            <div className="flex py-3 px-12 items-center justify-between">
              <div className="text-gray-400">Bid on the curently going deal</div>
              
              <div className="p-2 transition-all hover:bg-gray-600 rounded-full">
                <FaArrowRight color="white" size={15} />
              </div>

            </div>
            <div className="bg-gradient-to-r from-gray-600 via-[#0000] to-[#0000] flex md:m-6 m-2 border- border-gray-600 overflow-hidden rounded-3xl flex-row mt-3 md:mt-6">
              <div className="md:py-20 py-10 rounded-3xl p-2 pl-2 flex-1 flex flex-col items-center justify-center">
                <div className="text-white font-semibold flex text-center text-2xl md:text-5xl max-w-72">
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
                  className="size72"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/** Footer */}
      <div className="top-icon flex flex-col  items-center py-6 px-2 pb-0">
        <div className="bg-black border- border-b-[#0000] border-gray-600 p-6 md:p-12 pb-0 flex flex-col max-w-[1340px] rounded-t-3xl w-full">
          <div className="mb-2 text-sm md:text-xl  font-semibold text-gray-300">Clean Art</div>
          <div>
            <Link href={'/home'}>
              <div className="text-xs md:text-xl text-gray-400">Home</div>
            </Link>
            <Link href={'/products'}>
              <div className="text-xs md:text-xl text-gray-400">Products</div>
            </Link>
            <Link href={'/about'}>
              <div className="text-xs md:text-xl text-gray-400">About</div>
            </Link>
          </div>
          <div className="mb-1 text-sm md:text-xl text-gray-500 mt-6 text-center">Contact the Artist</div>
          <div className="p-1 md:p-3 flex flex-col overflow-scroll justify-center mt-1">

            <div className="flex items-center justify-center gap-6">
              <Link href={''}>
                <div className="sidebar-3 opacity-0 bg-gray-700 rounded-full">
                  <Image src={whatsapp} className='size-6 md:size-12' alt='' />
                </div>
              </Link>
              <Link href={'https://www.instagram.com/yafet.el'}>
                <div className="sidebar-4 opacity-0 bg-gray-700 rounded-full">
                  <Image src={instagram} className='size-6 md:size-12' alt='' />
                </div>
              </Link>
              <Link href={'https://t.me/yafet44'}>
                <div className="sidebar-5 opacity-0 bg-gray-700 rounded-full">
                  <Image src={telegram} className='size-6 md:size-12' alt='' />
                </div>
              </Link>
            </div>

            <div className="text-xs md:text-xl text-gray-500 mt-2 text-center">&copy; 2025 All Rights Reserved</div>
          </div>

        </div>

      </div>
    </div>
  );
}
