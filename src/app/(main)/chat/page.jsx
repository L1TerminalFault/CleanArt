import { Chat, User, addChat } from '@/db/db'
import { admin, userId } from '@/lib/utils'
import { getUserData } from '@/lib/utils'
import ChatAdmin from './chatAdmin'
import ChatClient from './chatClient'


export default async function () {
  const user = await getUserData()
  const { clerkId } = user
  const currentUserId = await userId()

  let isAdmin
  if (admin.includes(clerkId)) {
    isAdmin = true
  }

  const usersList = await User.find()
  let users = usersList.filter(user => !admin.includes(user.clerkId))
  users = JSON.parse(JSON.stringify(users))

  const { image } = user
  const { image: adminImage, _id: adminId } = JSON.parse(JSON.stringify(usersList)).find(eachUser => admin.includes(eachUser.clerkId))

  return (
    <>
      {
        isAdmin ? (<ChatAdmin currentUserImage={image} users={users} currentUserId={currentUserId.toString()} />)
        // props just modified to be directly passed to the chatComponent
        : (<ChatClient adminId={adminId} selectedUserImage={adminImage} currentUserImage={image} currentUserId={currentUserId} />)
      }
    </>
  )
}


