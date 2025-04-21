import Header from '@/components/header'
import { Suspense } from 'react'
import Loading from '@/components/loading'


export const metadata = {
  title: {
    default: "Chat"
  }
}

export default function ({ children }) {
  return ( 
    <div className='opacity-0 page-slide flex flex-col w-full items-stretch'>
      <Header title='Chat'/>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </div>
  )
}
