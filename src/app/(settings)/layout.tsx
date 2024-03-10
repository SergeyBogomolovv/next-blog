import Navbar from './_components/navbar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-grow items-center justify-center'>
      <div className='md:w-[700px] md:m-0 m-5 flex flex-col gap-y-10 bg-neutral-900 p-10 rounded-lg'>
        <Navbar />
        {children}
      </div>
    </div>
  )
}
