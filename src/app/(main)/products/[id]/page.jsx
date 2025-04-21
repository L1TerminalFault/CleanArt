import ProductDetails from './page_client'
import { Product } from '@/db/db'

export default async function () {
  const productsList = await Product.find()

  // optimization extract the url parameters here and request database the product that id matches the url param 
  // like await Product.findOne({ _id: <the parameter just extracted> })
  
  const products = JSON.parse(JSON.stringify((productsList)))
  return (
    <ProductDetails products={products} />
  )
}