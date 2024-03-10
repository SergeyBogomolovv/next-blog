import Link from 'next/link'

const ReturnButton = ({ children }: { children: React.ReactNode }) => {
  return <Link href={'/'}>{children}</Link>
}

export default ReturnButton
