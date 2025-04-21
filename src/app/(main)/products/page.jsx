import { Product } from "@/db/db";
import Products from './page_client'


export default async function () {
  // await new Promise(resolve => setTimeout(() => resolve(), 10000))
  const productsList = await Product.find()
  const products = JSON.parse(JSON.stringify(productsList))
  // const products = []
  return (
    <Products products={products} />
  )
}