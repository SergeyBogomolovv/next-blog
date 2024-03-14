import Navbar from './_components/navbar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-grow justify-center'>
      <div className='md:w-[800px] w-full m-5 flex flex-col gap-y-10 md:p-10 sm:p-8 p-6 rounded-lg'>
        <Navbar />
        {children}
      </div>
    </div>
  )
}
