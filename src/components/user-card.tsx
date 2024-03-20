import { FaUser } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { User } from '@prisma/client'
import { Badge } from './ui/badge'

interface Props {
  user: User
  label: string
}

export default function UserCard({ user, label }: Props) {
  const avatar = user?.image?.startsWith('avatars/')
    ? `https://next-blog.storage.yandexcloud.net/${user?.image}`
    : user?.image
  return (
    <HoverCard>
      <HoverCardTrigger className='flex w-fit items-center cursor-pointer'>
        <Badge variant={'outline'}>
          <Avatar className='w-9 h-9 mr-3'>
            <AvatarImage
              src={avatar || ''}
              className='aspect-square object-cover'
            />
            <AvatarFallback className='bg-black dark:bg-white p-2'>
              <FaUser className='text-white dark:text-black h-full w-full' />
            </AvatarFallback>
          </Avatar>

          <div className='flex flex-col'>
            <p className='text-sm font-semibold'>{label}</p>
            <p className='text-sm text-muted-foreground font-semibold'>
              {user.name}
            </p>
          </div>
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className='w-full'>
        <div className='flex items-center gap-x-4'>
          <Avatar className='w-32 h-32'>
            <AvatarImage
              src={user.image || ''}
              className='aspect-square object-cover'
            />
            <AvatarFallback className='bg-black dark:bg-white p-8'>
              <FaUser className='text-white dark:text-black h-full w-full' />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row items-center justify-between rounded-lg border p-2 shadow-md gap-2'>
              <p className='text-sm font-medium'>ID</p>
              <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
                {user.id}
              </p>
            </div>
            <div className='flex flex-row items-center justify-between rounded-lg border p-2 shadow-md gap-2'>
              <p className='text-sm font-medium'>Email</p>
              <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
                {user.email}
              </p>
            </div>
            <div className='flex flex-row items-center justify-between rounded-lg border p-2 shadow-md gap-2'>
              <p className='text-sm font-medium'>2FA</p>
              <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
                {user.isTwoFactorEnabled ? 'YES' : 'NO'}
              </p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
