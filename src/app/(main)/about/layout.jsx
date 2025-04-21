import Header from '@/components/header'

export const metadata = {
  title: {
    default: "About"
  }
} 

export default function ({children}) {
  return (
    <div className='opacity-0 page-slide flex w-full items-stretch flex-col'>
      <Header title='About' />
      {children}
    </div>
  )
}
