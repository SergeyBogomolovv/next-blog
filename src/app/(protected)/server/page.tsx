import UserInfo from '@/components/auth/user-info'
import { auth } from '@/lib/auth'

const ServerPage = async () => {
  const session = await auth()
  return <UserInfo label='Server component' user={session?.user} />
}

export default ServerPage
