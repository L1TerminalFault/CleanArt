import { Product } from "@/db/db";
import Products from './page_client'
import { isAdmin } from "@/lib/utils";


export default async function () {
  const admin = await isAdmin()
  // await new Promise(resolve => setTimeout(() => resolve(), 10000))
  const productsList = await Product.find()
  const products = JSON.parse(JSON.stringify(productsList))
  // const products = []
  return (
    <Products admin={admin} products={products} />
  )
}