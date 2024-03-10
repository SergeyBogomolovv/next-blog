import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React from 'react'
import { Button } from '../ui/button'
import { CiBookmarkPlus } from 'react-icons/ci'

export default function SuggestModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'outline'}>
          <CiBookmarkPlus className='w-5 h-5 sm:mr-2' />
          <span className='sm:block hidden'>Suggest a post</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
