import Image from 'next/image'
import { Orbitron } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FaMicroblog } from 'react-icons/fa6'
import { IoIosInformationCircleOutline } from 'react-icons/io'

const font = Orbitron({ subsets: ['latin'], weight: ['600'] })

export default function Home() {
  return (
    <main className='flex flex-grow flex-col justify-center items-center container my-10'>
      <div className='grid md:grid-cols-2 lg:gap-10 gap-8'>
        <div className='flex flex-col h-full justify-between gap-4'>
          <h1
            className={cn(
              'xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-extrabold dark:text-white tracking-widest text-center md:text-start',
              font.className
            )}
          >
            Dolor sit amet
          </h1>
          <div className='flex flex-col gap-6 text-center md:text-start'>
            <p
              className={cn(
                'xl:text-lg lg:text-base text-sm dark:text-white tracking-widest',
                font.className
              )}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              at, reiciendis laboriosam numquam amet deserunt voluptate quidem
              ipsum ullam possimus tenetur aperiam et nobis cum aliquam
              temporibus natus necessitatibus. Magnam.
            </p>
            <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-6'>
              <Image
                className='rounded-lg w-9/12 sm:w-full mx-auto'
                src={'/4.jpeg'}
                width={500}
                height={500}
                alt=''
              />
              <Image
                className='rounded-lg w-9/12 sm:w-full mx-auto hidden md:block'
                src={'/3.jpeg'}
                width={500}
                height={500}
                alt=''
              />
              <Image
                className='rounded-lg w-9/12 sm:w-full mx-auto'
                src={'/5.jpeg'}
                width={500}
                height={500}
                alt=''
              />
            </div>

            <p
              className={cn(
                'xl:text-lg lg:text-base text-sm dark:text-white tracking-widest',
                font.className
              )}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
              maxime explicabo, tempore natus a nobis, totam quaerat corrupti,
              quam provident blanditiis modi ipsa reprehenderit officiis! Minima
              sed aperiam voluptates nam.
            </p>
          </div>
          <div className='grid grid-cols-2 gap-x-10'>
            <Button size={'lg'} asChild>
              <Link href={'/posts'}>
                <FaMicroblog className='w-6 h-6 mr-2' />
                Blog
              </Link>
            </Button>
            <Button size={'lg'} variant={'outline'} asChild>
              <Link href={'/about'}>
                <IoIosInformationCircleOutline className='w-6 h-6 mr-2' />
                Read More
              </Link>
            </Button>
          </div>
        </div>
        <Image
          src={'/youshimura.jpg'}
          alt=''
          width={1000}
          height={1000}
          className='rounded-lg md:block hidden'
        />
      </div>
    </main>
  )
}
