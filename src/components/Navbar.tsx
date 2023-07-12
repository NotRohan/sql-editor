import Heading from '@/ui/Heading'

const Navbar = () => {
  return (
    <nav className='fixed backdrop-blur-sm bg-white/75 z-50 top-0 left-0 right-0 h-16 lg:h-20 border-b border-slate-300 shadow-sm flex items-center justify-between'>
      <div className='container max-w-7xl mx-auto pl-6 w-full flex justify-between items-center'>
        <Heading size='sm'>SQL</Heading>
      </div>
    </nav>
  )
}

export default Navbar
