import { addChat } from "@/db/db"


export async function POST(request) {
  const data = (await request.json())
  await addChat(data)
  return Response.json({ success: true })
}