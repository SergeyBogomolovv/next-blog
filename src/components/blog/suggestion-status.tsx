import { PostStatus } from '@prisma/client'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { CiClock2 } from 'react-icons/ci'
import { IoIosCloseCircleOutline } from 'react-icons/io'
interface Props {
  status: PostStatus
}

const SuggestionStatusComponent = ({ status }: Props) => {
  return (
    <>
      {status === PostStatus.declined && (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive w-full'>
          <IoIosCloseCircleOutline className='w-4 h-4' />
          <p>Suggestion declined</p>
        </div>
      )}
      {status === PostStatus.accepted && (
        <div className='bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 w-full'>
          <CheckCircledIcon className='w-4 h-4' />
          <p>Suggestion accepted, check our blog!</p>
        </div>
      )}
      {status === PostStatus.waiting && (
        <div className='bg-yellow-600/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-yellow-600 w-full'>
          <CiClock2 className='w-4 h-4' />
          <p>Our admins will check your suggestion as soon as possible</p>
        </div>
      )}
    </>
  )
}

export default SuggestionStatusComponent
