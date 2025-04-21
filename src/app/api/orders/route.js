import { Order, addOrder } from "@/db/db"
import { mongoUserId } from "@/lib/utils"

const userFetch = async () => {
  return (JSON.parse(JSON.stringify(await mongoUserId())))._id
}

export async function GET() {
  const user = await userFetch()
  const orders = (JSON.parse(JSON.stringify((await Order.find())))).filter(eachOrder => eachOrder.user === user)
  return Response.json({ orders })
}

export async function POST(req) {
  const data = await req.json()
  const user = await userFetch()
  await Order.insertMany(data)
  return Response.json({ success: true })
}

export async function PATCH(req) {
  const id = await req.json()
  await Order.updateOne(
    { _id: id },
    { $set: { amount: 'ready' }}
  )
  return Response.json({ success: true })
}
