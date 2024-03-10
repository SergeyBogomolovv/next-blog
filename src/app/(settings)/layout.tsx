import Navbar from './_components/navbar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-grow flex-col gap-y-10 items-center justify-center'>
      <Navbar />
      {children}
    </div>
  )
}
