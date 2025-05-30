import { auth, clerkClient } from '@clerk/nextjs/server';
import { User } from '@/db/db';

export const admin = ['user_2w65SIDxF0EYHSjsGxmuxNbaycO', 'user_2w5pwIUWrqt2T9aT7ptQmnTb1kZ'] 

export async function userId() {
  const { clerkId } = await getUserData()
  const user = await User.findOne({ clerkId })
  const id = user._id
  // console.log('the user is',typeof id.toJSON());
  
  return id.toJSON()
}

export async function getUserData() {
  const { userId, sessionClaims } = await auth()
  if (userId) {
    const userData = await (await clerkClient())?.users?.getUser(sessionClaims.sub)

    const username = userData.firstName + ' ' + userData.lastName
    const email = userData.emailAddresses[0].emailAddress
    const image = userData.imageUrl

    return { clerkId: userId, username, email, password: '', image }
  }
}

export async function isAdmin() {
  const { clerkId } = await getUserData()
  if (admin.includes(clerkId)) return true
  return false  
}

export async function mongoUserId() {
  const { clerkId } = await getUserData()
  return await User.findOne({ clerkId })
}
