import { Product } from '@/db/db'


export async function GET() {
  const products = JSON.parse(JSON.stringify(await Product.find()))
  return Response.json({ products })
}
