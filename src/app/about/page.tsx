import { cn } from '@/lib/utils'
import { Orbitron, Poppins } from 'next/font/google'
import Image from 'next/image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const font = Orbitron({ subsets: ['latin'], weight: ['600'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['600'] })
const AboutPage = () => {
  return (
    <main className='flex flex-grow flex-col gap-10 justify-center items-center container my-10'>
      <h1
        className={cn(
          'xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-extrabold dark:text-white tracking-widest text-center md:text-start',
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
        This is my social media analog, built on Next js
      </h3>
      <h2
        className={cn(
          'lg:text-5xl md:text-3xl text-2xl font-extrabold dark:text-white tracking-wide text-center md:text-start',
          poppins.className
        )}
      >
        Project stack
      </h2>
      <p>Framework - Next.js</p>
      <p>Auth - Auth.js</p>
      <p>Database - Postgres</p>
      <p>ORM - Prisma</p>
      <p>UI - shadcn/ui</p>
      <h2
        className={cn(
          'lg:text-5xl md:text-3xl text-2xl font-extrabold dark:text-white tracking-wide text-center md:text-start',
          poppins.className
        )}
      >
        Features
      </h2>
      <Accordion type='multiple' className='w-8/12'>
        <AccordionItem value='auth'>
          <AccordionTrigger>Authentication</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='posts'>
          <AccordionTrigger>Posts</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='admins'>
          <AccordionTrigger>Admins</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='user'>
          <AccordionTrigger>User</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='theme'>
          <AccordionTrigger>Theming</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h2
        className={cn(
          'lg:text-5xl md:text-3xl text-2xl font-extrabold dark:text-white tracking-wide text-center md:text-start',
          poppins.className
        )}
      >
        Links
      </h2>
    </main>
  )
}

export default AboutPage
