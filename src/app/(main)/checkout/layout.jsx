import Header from '@/components/header'
import { Suspense } from 'react'
import Loading from '@/components/loading'


export default const metadata = {
  title: {
    default: "Checkout"
  }
}

export default function ({ children }) {
  return ( 
    <div className='opacity-0 page-slide w-full flex flex-col items-stretch'>
      <Header title='Checkout' />
      <Suspense fallback={<Loading />} >
        {children}
      </Suspense>
    </div>
  )
}
