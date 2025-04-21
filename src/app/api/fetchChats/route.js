import { Chat } from "@/db/db"


export async function GET() {
  const chats = JSON.parse(JSON.stringify((await Chat.find())))
  console.log(chats)
  return Response.json(chats)
}