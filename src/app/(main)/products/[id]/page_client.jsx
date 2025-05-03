"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import images from '@/_imagesImport'

export default function ({ products }) {
  const [client, setClient] = useState(false)
  const { id } = useParams()
  const [exist, setExist] = useState('checking')

  const fetchAndCheck = async (id) => {
    const orders = (await ((await fetch('/api/orders')).json())).orders
    const exist = orders.find(eachOrder => eachOrder.productId === id)
    if (exist) return true
  }

  const product = products.find(each => each._id === id)

  useEffect(() => {
    const run = async () => {
      setClient(true)
      if (JSON.parse(window.localStorage.getItem('clean_art_cart')).includes(id)) setExist('yes')
      if (await fetchAndCheck(id)) {setExist('ordered'); return}
      setExist('no')
    }

    run()
  })
  if (!client) return

  const exists = (id) => {
    if (!client) return
    const product = window.localStorage.getItem('clean_art_cart')
    if (JSON.parse(product).includes(id)) {
      setExist(true); alert('exists')
      return true
    } else return false
  }



  const addToCart = (productId) => {
    if (!client) return
    const cart = window.localStorage.getItem('clean_art_cart')
    if (!cart) {
      window.localStorage.setItem('clean_art_cart', JSON.stringify([productId]))
    } else {
      let cartObj = JSON.parse(cart)
      if (!((JSON.parse(localStorage.getItem('clean_art_cart'))).includes(productId))) {

        cartObj = [...cartObj, productId]
        window.localStorage.setItem('clean_art_cart', JSON.stringify(cartObj))
      }
    }
    setExist(true)

    // alert(window.localStorage.getItem('clean_art_cart'))
  }

  const removeFromCart = (productId) => {
    if (!client) return
    const cart = JSON.parse(window.localStorage.getItem('clean_art_cart'))
    window.localStorage.setItem('clean_art_cart', JSON.stringify(cart.filter(each => each !== productId)))
    // alert(window.localStorage.getItem('clean_art_cart'))
  }

  return (
    <div className='h-[calc(100vh-150px)] md:h-[calc(100vh-270px)] overflow-hidden'>

      {product ?
        <div className="p-6 max-h-[calc(100%-0px)] overflow-scroll">
          <div className='flex flex-col md:flex-row mb-12 md:mb-0 text-white'>
            <div className='bg-gradient-to-r md:bg-gradient-to-l from-gray-700 to-[#0000] flex items-center justify-center rounded-t-3xl md:rounded-none overflow-hidden flex-0 w-[100%]'>
              <Image 
                src={product.image.includes('http') ? product.image : images['img_' + product.image]} 
                alt='' 
                width={100}
                height={100}
                className='p-1 rounded-3xl h-full w-[90%]' 
              />
            </div>
            <div className='w-full'>
              <div className='lg:gap-2 flex flex-col justify-center bg-gradient-to-l from-[#0000] to-gray-700 rounded-b-3xl md:rounded-none h-full w-full p-5 flex-1'>
                <div className='text-sm lg:text-lg md:text-md'>Category {product.category}</div>
                <div className='text-lg lg:text-xl font-semibold'>{product.title}</div>
                <div className='text-2xl lg:text-4xl font-bold'>{product.price}</div>
                <div className='text-md lg:text-xl'>{product.time}</div>
                <div className='max-w-[60%] text-gray-400 text-xs md:text-md lg:text-lg'>{product.description}</div>
                {exist === 'yes'
                  ? <div onClick={() => { removeFromCart(id); setExist('no') }} className='bg-red-700 text-sm mt-1 hover:bg-red-600 transition-all w-max px-3 py-1 rounded-full md:font-semibold'>Remove From Cart</div>
                  : exist === 'no'
                    ? <div onClick={() => addToCart(id)} className={`bg-orange-700 hover:bg-orange-600 text-sm mt-1 transition-all w-max px-3 py-1 rounded-full md:font-semibold`}>Add To Cart</div>
                    : exist === 'ordered'
                    ? <div className={`bg-gray-600 w-max px-3 py-1  rounded-full text-sm mt-1 md:font-semibold`}>Ordered</div>
                    : <div className={`bg-gray-600 w-max px-3 py-1  rounded-full text-sm mt-1 md:font-semibold`}>Checking</div>
                }
              </div>
            </div>
          </div>
        </div>
        : <div className='text-white'>No Product</div>
      }
    </div>
  )
}