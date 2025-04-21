import { Product, Order } from '@/db/db'
import Checkout from './page_client'
import { mongoUserId } from '@/lib/utils'

// const products = [
//   {
//     _id: '5de',
//     category: 'landscape',
//     title: 'This is shit',
//     description: 'this is also the most bullshit thing ever to be found',
//     time: 'in 2 weeks',
//     image: 'null',
//     price: '$59,999 per sqmeter'
//   },
//   {
//     _id: '2af',
//     category: 'portrait',
//     title: 'I am really sure',
//     description: 'I am really sure that this producta is not saved  by this user',
//     time: 'in 5 days',
//     image: 'null',
//     price: '$10,888 per sqmeter'
//   },
//   {
//     _id: '59uyt',
//     category: 'portrait',
//     title: 'I am really sure',
//     description: 'I am really sure that this producta is not saved  by this user',
//     time: 'in 5 days',
//     image: 'null',
//     price: '$10,888 per sqmeter'
//   }
// ]

// const user = 'ytoiewirty'


export default async function () {
  const userId = JSON.parse(JSON.stringify(await mongoUserId()))
  const user = userId._id
  const productsList = await Product.find()
  const orderList = await Order.find()
  const orders = JSON.parse(JSON.stringify(orderList)).filter(eachOrder => eachOrder.user === user)
  const products = JSON.parse(JSON.stringify(productsList))
  return (
    <Checkout products={products} orders= {orders} user={user} />
  )
}