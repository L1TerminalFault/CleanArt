"use client"

import { useEffect, useState } from "react"
import Image from 'next/image'
import { FaShoppingBag, FaShoppingBasket, FaShoppingCart } from 'react-icons/fa'
import PopUp from '@/components/pop_up'

import images from '@/_imagesImport'

export default function ({ products, user, orders }) {

  const userSelection = () => {
    if (!client) return
    const cart = JSON.parse(window.localStorage.getItem('clean_art_cart'))
    if (!cart.length) setEmptyCart(true)
    return cart
  }

  const selectedProducts = () => {
    if (!client) return []
    return products.filter(eachProduct => userSelection().includes(eachProduct._id))
  }

  const [client, setClient] = useState(false)
  const [selectedProductsList, setSelectedProductsList] = useState([])
  const [pop, setPop] = useState(false)
  const [emptyCart, setEmptyCart] = useState(false)
  const [placingOrder, setPlacingOrder] = useState(false)

  const orderList = orders.map(eachOrder => {
    const product = products.find(eachProduct => eachProduct._id === eachOrder.productId)
    product.status = eachOrder.amount
    return product
  })


  useEffect(() => {
    setClient(true)
    const list = selectedProducts()
    setSelectedProductsList([...list, ...orderList])
    console.log(selectedProductsList)

  }, [client])

  if (!client) return



  const removeProduct = (id) => {
    setSelectedProductsList(prevList => prevList.filter(eachItem => eachItem._id !== id))
    window.localStorage.setItem('clean_art_cart', JSON.stringify(selectedProductsList.filter(eachProduct => eachProduct._id !== id).map(eachProduct => eachProduct._id)))
  }


  const setItem = () => {
    if (!client) return
    window.localStorage.setItem('clean_art_cart', JSON.stringify(['5de', '2af']))
  }

  // setItem()

  const showPopUp = () => {
    setPop(true)
    setTimeout(() => setPop(false), 8000)
  }
  // window.localStorage.setItem('clean_art_cart', JSON.stringify([]))

  const placeOrder = async () => {
    setPlacingOrder(true)
    const orders = (selectedProductsList.filter(eachProduct => !eachProduct.status).map(eachItem => eachItem._id)).map(productId => ({ user, productId, amount: 'pending' }))
    // TODO: send orders to a backend api
    const success = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orders)
    })

    const res = await fetch('/api/orders')
    const orderList = (await res.json()).orders
    let list = orderList.map(eachOrder => {
      const product = products.find(eachProduct => eachProduct._id === eachOrder.productId)
      product.status = eachOrder.amount
      return product
    })

    window.localStorage.setItem('clean_art_cart', JSON.stringify([]))
    setEmptyCart(true)

    setSelectedProductsList(list)
    showPopUp()
    setPlacingOrder(false)
  }



  return (
    <div className="md:p-5 p-2 md:pb-24 pb-40 sm:pb-0 overflow-scroll">
      {pop &&
        <div className="z-50 text-center w-full fixed flex items-center justify-center">
          <PopUp message={'Order Placed Successfully. Contact or chat with the artist for completing your payment'} />
        </div>
      }
      {selectedProductsList.length !== 0 ?
        <div>
          <div className='gap-2 flex flex-col text-white'>
            {selectedProductsList.map(eachProduct => (
              <div key={eachProduct._id} className="">
                <div className="flex flex-col gap-2 bg-gradient-to-r from-gray-600 to-[#0000] rounded-3xl p-3">
                  <div className='flex flex-row w-full'>
                    <div className='size-52 rounded-2xl overflow-hidden'>
                      <Image
                        src={eachProduct.image.includes('http') ? eachProduct.image : images['img_' + eachProduct.image]}
                        alt=''
                        width={100}
                        height={100}
                        className='h-full w-full'
                      />
                    </div>
                    <div className='ml-2 items-center rounded-2xl flex-1 p-3 bg-gradient-to-r from-gray-600 via-gray-700'>
                      <div className='font-semibold'>{eachProduct.title}</div>
                      <div className=''>{eachProduct.price}</div>
                      <div className='md:text-sm text-gray-400 text-xs mt-2'>{eachProduct.description}</div>
                    </div>
                  </div>

                  {eachProduct.status ?
                    <div className='justify-between flex px-3'>
                      <div className='text-sm md:text-md text-center flex items-center'>Ordered</div>
                      <div className='text-sm md:text-md inline rounded-full px-4 py-1 text-center'>{eachProduct.status === 'ready' ? <div className="text-green-400 font-semibold">Ready</div> : <div className="text-gray-100">Pending</div>}</div>
                    </div>
                    : <div className='justify-between flex px-3'>
                      <div className='text-sm md:text-md text-center flex items-center'>Added To Cart</div>
                      <div onClick={() => removeProduct(eachProduct._id)} className='text-sm md:text-md hover:bg-orange-600 transition-all bg-orange-700 inline rounded-full px-4 py-1 text-center'>Remove From Cart</div>
                    </div>
                  }

                </div>
              </div>

            ))}
          </div>
          {emptyCart ? null : placingOrder ?
            <div style={{ boxShadow: '0px 0px 12px #041a0f' }} className=' text-gray-900 transition-all absolute rounded-full md:px-9 py-2 md:py-4 px-5 font-semibold md:bottom-5 bottom-24 right-5 text-lg md:text-xl bg-purple-600'>
              <div className="rounded-full animate-spin p-1 bg-gradient-to-tr from-gray-500 to-gray-900">
                <div className="rounded-full p-2 bg-purple-600"></div>
              </div>
            </div>
            : <div onClick={placeOrder} style={{ boxShadow: '0px 0px 12px #041a0f' }} className='hover:bg-purple-400 text-gray-900 transition-all active:bg-purple-400 absolute rounded-full md:px-9 py-2 md:py-4 px-5 font-semibold md:bottom-5 bottom-24 right-5 text-lg md:text-xl bg-purple-600'>Place Order</div>
          }
        </div>
        : (
          <div className='text-xl gap-2 flex flex-col items-center justify-center w-full h-[calc(100vh-300px)] text-gray-500'>
            <FaShoppingCart className='size-20' />
            No Items in your cart
          </div>
        )
      }
    </div>
  )
}



