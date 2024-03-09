'use client'

import { useRouter } from 'next/navigation'

const ReturnButton = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  return <div onClick={() => router.back()}>{children}</div>
}

export default ReturnButton
