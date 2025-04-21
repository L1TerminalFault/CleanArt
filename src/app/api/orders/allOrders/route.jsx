import { Order } from '@/db/db'


export async function GET() {
  const orders = JSON.parse(JSON.stringify((await Order.find())))

  return Response.json({ orders })
}
