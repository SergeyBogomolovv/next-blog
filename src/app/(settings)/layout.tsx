import Navbar from './_components/navbar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-grow justify-center'>
      <div className='md:w-[800px] w-full m-5 flex flex-col gap-y-10 rounded-lg'>
        <Navbar />
        <div className='space-y-8'>{children}</div>
      </div>
    </div>
  )
}
