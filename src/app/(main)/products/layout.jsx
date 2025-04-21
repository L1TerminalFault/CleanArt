import Header from '@/components/header'
import { Suspense } from 'react'
import Loading from '@/components/loading'


export const metadata = {
  title: {
    default: "Products"
  }
}


export default function ({ children }) {
  return (
    <div className="opacity-0 page-slide h-full flex w-full items-stretch flex-col">
      <Header title='Products' />
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </div>
  )
}
