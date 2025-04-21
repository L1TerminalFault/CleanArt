import Header from '@/components/header'


export const metadata = {
  title: {
    default: "Home"
  }
}

export default function ({ children }) {
  return (
    <div className='opacity-0 page-slide flex w-full flex-col items-stretch'>
      <Header title={'Home'} />
      {children}
    </div>
  )
}
