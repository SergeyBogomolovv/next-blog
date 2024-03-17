import { currentUser } from '@/actions/current-user'
import UserInfo from '@/components/auth/user-info'

const ClientPage = async () => {
  const user = await currentUser()
  return (
    <div className='w-full'>
      <UserInfo label='Profile Information' user={user} />
    </div>
  )
}

export default ClientPage
