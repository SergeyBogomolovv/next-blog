import { cn } from '@/lib/utils'
import { Orbitron, Poppins } from 'next/font/google'
import { FaGithub } from 'react-icons/fa'
import { IoLogoVercel } from 'react-icons/io5'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SiNextdotjs } from 'react-icons/si'
import { SiPostgresql } from 'react-icons/si'
import { SiPrisma } from 'react-icons/si'
import { BsShieldShaded } from 'react-icons/bs'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const font = Orbitron({ subsets: ['latin'], weight: ['600'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['600'] })
const AboutPage = () => {
  return (
    <main className='flex flex-grow flex-col gap-10 justify-center items-center container my-10'>
      <h1
        className={cn(
          'xl:text-6xl md:text-5xl text-4xl font-extrabold dark:text-white tracking-widest text-center md:text-start',
          font.className
        )}
      >
        Welcome to Next Blog
      </h1>
      <h3
        className={cn(
          'lg:text-3xl md:text-2xl text-xl font-extrabold dark:text-white tracking-wider text-center md:text-start',
          poppins.className
        )}
      >
        This is my social media app analog, built on Next js
      </h3>
      <Separator />
      <h2
        className={cn(
          'lg:text-5xl md:text-3xl text-2xl font-extrabold dark:text-white tracking-wide text-center md:text-start',
          poppins.className
        )}
      >
        Project stack
      </h2>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-10'>
        <Link href={'https://nextjs.org/'} target='blank'>
          <Card>
            <CardHeader>
              <h1 className='text-2xl font-semibold text-center'>Framework</h1>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <SiNextdotjs className='w-6 h-6 mr-2' />
              <p className='text-xl'>Next.js</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={'https://authjs.dev/'} target='blank'>
          <Card>
            <CardHeader>
              <h1 className='text-2xl font-semibold text-center'>
                Authentication
              </h1>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <BsShieldShaded className='w-6 h-6 mr-2' />
              <p className='text-xl'>Auth.js</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={'https://www.postgresql.org/'} target='blank'>
          <Card>
            <CardHeader>
              <h1 className='text-2xl font-semibold text-center'>Database</h1>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <SiPostgresql className='w-6 h-6 mr-2' />
              <p className='text-xl'>Postgres</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={'https://www.prisma.io/'} target='blank'>
          <Card>
            <CardHeader>
              <h1 className='text-2xl font-semibold text-center'>ORM</h1>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <SiPrisma className='w-6 h-6 mr-2' />
              <p className='text-xl'>Prisma</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={'https://ui.shadcn.com/'} target='blank'>
          <Card>
            <CardHeader>
              <h1 className='text-2xl font-semibold text-center'>UI-kit</h1>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
              <SiNextdotjs className='w-6 h-6 mr-2' />
              <p className='text-xl'>shadcn/ui</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      <Separator />

      <h2
        className={cn(
          'lg:text-5xl md:text-3xl text-2xl font-extrabold dark:text-white tracking-wide text-center md:text-start',
          poppins.className
        )}
      >
        Features
      </h2>
      <Accordion type='multiple' className='md:w-8/12 w-full'>
        <AccordionItem value='auth'>
          <AccordionTrigger>Authentication</AccordionTrigger>
          <AccordionContent>
            The application has full-featured authorization, including
            registration, login via oauth, it is also possible to register using
            email, enable two-factor authentication and change your password if
            you have forgotten it
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='posts'>
          <AccordionTrigger>Posts</AccordionTrigger>
          <AccordionContent>
            You can suggest posts for ours and the blog, all proposals will be
            considered and, based on the results, will be either published or
            rejected. All posts can be commented by registered users
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='admins'>
          <AccordionTrigger>Admins</AccordionTrigger>
          <AccordionContent>
            On our website you can become an administrator to review post
            suggestions and also manage comments.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='user'>
          <AccordionTrigger>User</AccordionTrigger>
          <AccordionContent>
            You can customize your profile, change your name and avatar, change
            your email, password, and also enable two-factor authentication
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='theme'>
          <AccordionTrigger>Theming</AccordionTrigger>
          <AccordionContent>
            You can choose the theme that you like best - dark or light
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Separator />

      <div className='flex flex-col gap-6 items-center'>
        <h2
          className={cn(
            'lg:text-4xl md:text-2xl text-xl font-extrabold dark:text-white tracking-wide text-center md:text-start',
            poppins.className
          )}
        >
          Links
        </h2>
        <div className='flex items-center gap-4'>
          <Button variant={'outline'} asChild>
            <Link href={'https://github.com/SergeyBogomolovv/next-blog'}>
              <FaGithub className='w-6 h-6 mr-2' />
              Github
            </Link>
          </Button>
          <Button variant={'outline'} asChild>
            <Link
              href={
                'https://vercel.com/geraxs-projects/next-blog-xhr/6m3Kpm2LB5X4AHmLmV18PzMJYjos'
              }
            >
              <IoLogoVercel className='w-6 h-6 mr-2' />
              Vercel
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default AboutPage
