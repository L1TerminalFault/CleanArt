import Palletes from './sidebar_client'


export default async function SideBar() {
  const list = [
    {
      name: 'Home',
      link: '/home',
      icon: 1
    },
    {
      name: 'Products',
      link: '/products',
      icon: 2
    },
    {
      name: 'Chat',
      link: '/chat',
      icon: 3
    },
    {
      name: 'Checkout',
      link: '/checkout',
      icon: 4
    },
    {
      name: 'About',
      link: '/about',
      icon: 5
    }
  ]
  return (
    <div className="z-10 md:relative md:h-fll fixed flex-row md:p-5 p-3 md:w-auto w-full  bottom-0 md:pt-24 md:justify-normal justify-center items-stretch backdrop-blur-2xl flex md:flex-col md:border-r md:gap-3 gap-1 border-gray-700">
      {
        list.map(each => (
          <Palletes key={each.name} each={each} />
        ))
      }
    </div>
  )
}
