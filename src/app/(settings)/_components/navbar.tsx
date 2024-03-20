'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import Link from 'next/link'
import { VscGitPullRequestNewChanges } from 'react-icons/vsc'
import { IoSettingsOutline } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { IoIosLogOut } from 'react-icons/io'
import { signOut } from 'next-auth/react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { CiClock2 } from 'react-icons/ci'
import { MdPublic } from 'react-icons/md'
import { BsBan } from 'react-icons/bs'

export default function Navbar() {
  const user = useCurrentUser()
  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Suggestions</MenubarTrigger>
          <MenubarContent>
            <MenubarItem asChild>
              <Link href={'/new-suggestion'}>
                <VscGitPullRequestNewChanges className='w-4 h-4 mr-2' />
                Suggest a Post
              </Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem asChild>
              <Link href={'/my-suggestions'}>
                <CiClock2 className='w-4 h-4 mr-2' />
                Waiting
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link href={'/my-suggestions/published'}>
                <MdPublic className='w-4 h-4 mr-2' />
                Published
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link href={'/my-suggestions/declined'}>
                <BsBan className='w-4 h-4 mr-2' />
                Declined
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        {user?.role === 'ADMIN' && (
          <MenubarMenu>
            <MenubarTrigger>Dashboard</MenubarTrigger>
            <MenubarContent>
              <MenubarItem asChild>
                <Link href={'/admin/accepted'}>
                  <MdPublic className='w-4 h-4 mr-2' />
                  Blog
                </Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem asChild>
                <Link href={'/admin'}>
                  <CiClock2 className='w-4 h-4 mr-2' />
                  Latest
                </Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href={'/admin/declined'}>
                  <BsBan className='w-4 h-4 mr-2' />
                  Declined
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        )}
        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent>
            <MenubarItem asChild>
              <Link href={'/settings'}>
                <IoSettingsOutline className='w-4 h-4 mr-2' />
                Profile Settings
              </Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link href={'/info'}>
                <CgProfile className='w-4 h-4 mr-2' />
                My Profile
              </Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem
              onClick={() => {
                signOut()
              }}
            >
              <IoIosLogOut className='w-4 h-4 mr-2' />
              Logout
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  )
}
