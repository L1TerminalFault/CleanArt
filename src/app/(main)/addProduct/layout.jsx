import Header from '@/components/header'

export const metadata = {
  title: {
    default: 'Add Product'
  }
}

export default function ({ children }) {
  return (
    <div className='opacity-0 page-slide flex w-full items-stretch flex-col'>
      <Header title='Add Product' />
      {children}
    </div>
  )
}