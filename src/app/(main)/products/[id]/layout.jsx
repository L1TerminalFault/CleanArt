import Header from '@/components/header'


export const metadata = {
  title: {
    default: "Product Details"
  }
}


export default function ({ children }) {
  return (
    <div className='opacity-0 page-slide flex w-full flex-col items-stretch'>
      <Header title={'Product Details'} />
      {children}
    </div>
  )
}
