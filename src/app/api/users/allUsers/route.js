import { User } from '@/db/db'

export async function GET() {
  const users = JSON.parse(JSON.stringify(await User.find()))
  return Response.json({ users })
}
