const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex items-center justify-center flex-grow'>
      {children}
    </main>
  )
}

export default layout
